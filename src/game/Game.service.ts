import { IGameService } from './IGameService.interface';
import en from './words/en';
import ru from './words/ru';

const WORDS: { [key: string]: string } = { en, ru };

export class GameService implements IGameService {
  private async loadWords({ languageCode }: { languageCode: string }): Promise<string[]> {
    const wordsString = WORDS[languageCode] || WORDS[Object.keys(WORDS)[0]];
    const words = wordsString.trim().split(',');

    return words;
  }

  async getWords({ wordsQuantity, languageCode }: { wordsQuantity: number; languageCode: string }): Promise<string[]> {
    const allWords = await this.loadWords({ languageCode });
    const words = this.takeFromList({ list: allWords, quantity: wordsQuantity });

    return words;
  }

  async getCode({ codeLength, wordsQuantity }: { codeLength: number; wordsQuantity: number }): Promise<number[]> {
    const allWordsIndexes = Array(wordsQuantity)
      .fill(0)
      .map((item, index) => index + 1);

    const code = this.takeFromList({ list: allWordsIndexes, quantity: codeLength });

    return code;
  }

  private takeFromList<T>({ list, quantity }: { list: T[]; quantity: number }): T[] {
    const listCopy = [...list];

    const items = Array(quantity)
      .fill(0)
      .map(() => {
        const randomIndex = Math.floor(Math.random() * listCopy.length);
        const [item] = listCopy.splice(randomIndex, 1);

        return item;
      });

    return items;
  }
}
