import * as dotenv from 'dotenv';
import { NowRequest, NowResponse } from '@now/node';
import * as Mixpanel from 'mixpanel';

import { ConfigParameterNotDefinedError } from '../src/common/error/ConfigParameterNotDefinedError';
import { Main } from '../src/main/Main';
import { TelegramService } from '../src/telegram/Telegram.service';
import { GameService } from '../src/game/Game.service';
import { MessageService } from '../src/message/Message.service';
import { IMessageBody } from '../src/common/model/IMessageBody.interface';

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

export default async (_req: NowRequest, res: NowResponse) => {
  const {
    query: { token },
    body,
  } = _req;

  console.log('New request');

  if (process.env.TELEGRAM_TOKEN === undefined) {
    throw new ConfigParameterNotDefinedError('TELEGRAM_TOKEN');
  }
  if (process.env.APP_TOKEN === undefined) {
    throw new ConfigParameterNotDefinedError('APP_TOKEN');
  }

  if (token !== process.env.APP_TOKEN) {
    return res.status(401).send(
      JSON.stringify({
        result: 'wrong token',
      }),
    );
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
    const text = await main.processMessage(JSON.stringify(body));

    await track({ body: JSON.stringify(body), text });
  } catch (error) {
    console.error('Unexpected error occurred: ', error.message);
  }

  res.status(200).send(
    JSON.stringify({
      result: 'success',
    }),
  );
};
