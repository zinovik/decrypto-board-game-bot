import { IMessageService } from './IMessageService.interface';
import { IReplyMarkup } from './../common/model/IReplyMarkup.interface';

export class MessageService implements IMessageService {
  getWordsMessage({ words, languageCode }: { words: string[]; languageCode: string }): string {
    const time = this.getDate();

    const line = '- - -';
    const newLines = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';

    const wordsFormatted = words.reduce((acc, word, index) => `${acc}\n${index + 1}) ${word}`, '').toUpperCase();

    return `${time}\n${line}\n${wordsFormatted}${newLines}${line}`;
  }

  getCodeMessage({ code, languageCode }: { code: number[]; languageCode: string }): string {
    const time = this.getDate();
    const line = '- - -';
    const newLines = '\n\n';

    const codeFormatted = code.join(', ');

    return `${time}\n${line}${newLines}${codeFormatted}${newLines}${line}`;
  }

  getReplyMarkup({ languageCode }: { languageCode: string }): IReplyMarkup {
    return {
      keyboard: [['words en', 'words ru'], ['code'], ['help en', 'help ru']],
    };
  }

  getDate(): string {
    return new Date().toLocaleString('en-US', {
      timeZoneName: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: '2-digit',
    });
  }
}
