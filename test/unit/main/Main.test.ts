import { IMock, Mock } from 'typemoq';

import { Main } from '../../../src/main/Main';
import { ITelegramService } from '../../../src/telegram/ITelegramService.interface';
import { IGameService } from '../../../src/game/IGameService.interface';
import { IMessageService } from '../../../src/message/IMessageService.interface';

const WORDS_QUANTITY = 4;
const CODE_LENGTH = 3;

describe('Main', () => {
  let telegramServiceMock: IMock<ITelegramService>;
  let gameServiceMock: IMock<IGameService>;
  let messageServiceMock: IMock<IMessageService>;

  let main: Main;

  beforeEach(() => {
    telegramServiceMock = Mock.ofType<ITelegramService>();
    gameServiceMock = Mock.ofType<IGameService>();
    messageServiceMock = Mock.ofType<IMessageService>();

    const configuration = {
      wordsQuantity: WORDS_QUANTITY,
      codeLength: CODE_LENGTH,
    };

    main = new Main(configuration, telegramServiceMock.object, gameServiceMock.object, messageServiceMock.object);
  });

  afterEach(() => {
    telegramServiceMock.verifyAll();
    gameServiceMock.verifyAll();
    messageServiceMock.verifyAll();
  });

  it('Should process message', async () => {
    // Arrange

    // Act
    main.processMessage('');

    // Assert
    expect(true).toBeTruthy();
  });
});
