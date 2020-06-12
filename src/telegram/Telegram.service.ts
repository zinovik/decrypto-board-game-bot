import axios from 'axios';

import { ITelegramService } from './ITelegramService.interface';
import { ISendMessageResult } from './ISendMessageResult.interface';
import { IReplyMarkup } from './../common/model/IReplyMarkup.interface';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export class TelegramService implements ITelegramService {
  constructor(private readonly token: string) {
    this.token = token;
  }

  async sendMessage({
    chatId,
    text,
    replyMarkup,
  }: {
    chatId: string | number;
    text: string;
    replyMarkup: IReplyMarkup;
  }): Promise<void> {
    const message = {
      text,
      reply_markup: JSON.stringify(replyMarkup),
      chat_id: chatId,
      disable_notification: true,
      parse_mode: 'Markdown',
    };

    try {
      console.log(`Sending telegram message: ${JSON.stringify(message)}...`);

      const { data }: { data: ISendMessageResult } = await axios.post(
        `${TELEGRAM_API_URL}${this.token}/sendMessage`,
        message,
      );

      console.log(`Telegram message was successfully sent: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log('Error sending Telegram message', error);
    }
  }
}
