import { IMain } from './IMain.interface';
import { IConfiguration } from './IConfiguration.interface';
import { ITelegramService } from '../telegram/ITelegramService.interface';
import { IGameService } from './../game/IGameService.interface';
import { IMessageService } from '../message/IMessageService.interface';

import { IMessageBody } from '../common/model/IMessageBody.interface';

const HELP: { [key: string]: string } = {
  en: `https://www.scorpionmasque.com/en/decrypto`,
  ru: `https://www.scorpionmasque.com/ru/decrypto`,
};

export class Main implements IMain {
  constructor(
    private readonly configuration: IConfiguration,
    private readonly telegramService: ITelegramService,
    private readonly gameService: IGameService,
    private readonly messageService: IMessageService,
  ) {
    this.configuration = configuration;
    this.telegramService = telegramService;
    this.gameService = gameService;
    this.messageService = messageService;
  }

  async processMessage(notParsedMessage: string): Promise<string> {
    console.log(`New message: ${notParsedMessage}`);

    let messageParsed: IMessageBody;

    try {
      messageParsed = JSON.parse(notParsedMessage);
    } catch (error) {
      console.error('Error parsing user message: ', error.message);
      return 'Error parsing user message';
    }

    const {
      message: {
        from: { id, language_code: languageCode },
        text,
      },
    } = messageParsed;

    const textParsed = text.toLowerCase().trim();
    const languageCodeParsed = textParsed.split(' ')[1] || languageCode;

    switch (true) {
      case textParsed.includes('words'): {
        return await this.sendWordsMessage({ id, languageCode: languageCodeParsed });
      }

      case textParsed.includes('code'): {
        return await this.sendCodeMessage({ id, languageCode: languageCodeParsed });
      }

      case textParsed.includes('help'): {
        return await this.sendHelpMessage({ id, languageCode: languageCodeParsed });
      }

      default:
        return await this.sendHelloMessage({ id, languageCode: languageCodeParsed });
    }
  }

  private async sendWordsMessage({ id, languageCode }: { id: number; languageCode: string }): Promise<string> {
    const words = await this.gameService.getWords({
      wordsQuantity: this.configuration.wordsQuantity,
      languageCode,
    });
    const text = this.messageService.getWordsMessage({ words, languageCode });
    const replyMarkup = this.messageService.getReplyMarkup({ languageCode });

    await this.telegramService.sendMessage({
      chatId: id,
      text,
      replyMarkup,
    });

    return text;
  }

  private async sendCodeMessage({ id, languageCode }: { id: number; languageCode: string }): Promise<string> {
    const code = await this.gameService.getCode({
      codeLength: this.configuration.codeLength,
      wordsQuantity: this.configuration.wordsQuantity,
    });
    const text = this.messageService.getCodeMessage({ code, languageCode });
    const replyMarkup = this.messageService.getReplyMarkup({ languageCode });

    await this.telegramService.sendMessage({
      chatId: id,
      text,
      replyMarkup,
    });

    return text;
  }

  private async sendHelloMessage({ id, languageCode }: { id: number; languageCode: string }): Promise<string> {
    const text = 'Hello ;)';
    const replyMarkup = this.messageService.getReplyMarkup({ languageCode });

    await this.telegramService.sendMessage({
      chatId: id,
      text,
      replyMarkup,
    });

    return text;
  }

  private async sendHelpMessage({ id, languageCode }: { id: number; languageCode: string }): Promise<string> {
    const replyMarkup = this.messageService.getReplyMarkup({ languageCode });
    const text = HELP[languageCode] || HELP[Object.keys(HELP)[0]];

    await this.telegramService.sendMessage({
      chatId: id,
      text,
      replyMarkup,
    });

    return text;
  }
}
