import { IReplyMarkup } from './../common/model/IReplyMarkup.interface';

export interface ITelegramService {
  sendMessage({
    chatId,
    text,
    replyMarkup,
  }: {
    chatId: number;
    text: string;
    replyMarkup: IReplyMarkup;
  }): Promise<void>;
}
