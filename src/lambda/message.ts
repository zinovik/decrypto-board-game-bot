import * as dotenv from 'dotenv';
import * as Mixpanel from 'mixpanel';

import { ConfigParameterNotDefinedError } from '../common/error/ConfigParameterNotDefinedError';
import { Main } from '../main/Main';
import { TelegramService } from '../telegram/Telegram.service';
import { GameService } from '../game/Game.service';
import { MessageService } from '../message/Message.service';
import { IEvent } from './model/IEvent.interface';
import { IMessageBody } from '../common/model/IMessageBody.interface';

dotenv.config();

const track = ({ body, text }: { body: string; text: string }): Promise<void> => {
  return new Promise((resolve) => {
    if (process.env.MIXPANEL_TOKEN === undefined) {
      return resolve();
    }

    try {
      const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

      const messageParsed: IMessageBody = JSON.parse(body);

      const trackingData = {
        distinct_id: String(messageParsed.message.from.id),
        first_name: messageParsed.message.from.first_name,
        last_name: messageParsed.message.from.last_name,
        username: messageParsed.message.from.username,
        text,
      };

      console.log('Tracking request...', trackingData);

      mixpanel.track(messageParsed.message.text, trackingData, (trackResult) => {
        console.log('Tracking successfully finished', trackResult);

        resolve();
      });
    } catch (error) {
      console.log('Tracking error', error);

      resolve();
    }
  });
};

exports.handler = async ({ body, queryStringParameters: { token } }: IEvent, context: never) => {
  console.log('New request');

  if (process.env.TELEGRAM_TOKEN === undefined) {
    throw new ConfigParameterNotDefinedError('TELEGRAM_TOKEN');
  }
  if (process.env.APP_TOKEN === undefined) {
    throw new ConfigParameterNotDefinedError('APP_TOKEN');
  }

  if (token !== process.env.APP_TOKEN) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result: 'wrong token',
      }),
    };
  }

  const configuration = {
    wordsQuantity: 4,
    codeLength: 3,
  };

  const main = new Main(
    configuration,
    new TelegramService(process.env.TELEGRAM_TOKEN),
    new GameService(),
    new MessageService(),
  );

  try {
    const text = await main.processMessage(body);

    await track({ body, text });
  } catch (error) {
    console.error('Unexpected error occurred: ', error.message);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      result: 'success',
    }),
  };
};
