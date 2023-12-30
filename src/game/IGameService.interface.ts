export interface IGameService {
    getWords({
        wordsQuantity,
        languageCode,
    }: {
        wordsQuantity: number;
        languageCode: string;
    }): Promise<string[]>;
    getCode({
        codeLength,
        wordsQuantity,
    }: {
        codeLength: number;
        wordsQuantity: number;
    }): Promise<number[]>;
}
