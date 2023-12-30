export interface IMain {
    processMessage(notParsedMessage: string): Promise<string>;
}
