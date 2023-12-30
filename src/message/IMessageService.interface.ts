import { IReplyMarkup } from './../common/model/IReplyMarkup.interface';

export interface IMessageService {
    getWordsMessage({
        words,
        languageCode,
    }: {
        words: string[];
        languageCode: string;
    }): string;
    getCodeMessage({
        code,
        languageCode,
    }: {
        code: number[];
        languageCode: string;
    }): string;
    getReplyMarkup({ languageCode }: { languageCode: string }): IReplyMarkup;
}
