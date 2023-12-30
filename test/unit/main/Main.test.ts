import { IMock, Mock } from 'typemoq';

import { Main } from '../../../src/main/Main';
import { IMessengerService } from '../../../src/messenger/IMessengerService.interface';
import { IGameService } from '../../../src/game/IGameService.interface';
import { IMessageService } from '../../../src/message/IMessageService.interface';
import { IMessageBody } from '../../../src/common/model/IMessageBody.interface';

const WORDS_QUANTITY = 4;
const CODE_LENGTH = 3;

describe('Main', () => {
    let messengerServiceMock: IMock<IMessengerService>;
    let gameServiceMock: IMock<IGameService>;
    let messageServiceMock: IMock<IMessageService>;

    let main: Main;

    beforeEach(() => {
        messengerServiceMock = Mock.ofType<IMessengerService>();
        gameServiceMock = Mock.ofType<IGameService>();
        messageServiceMock = Mock.ofType<IMessageService>();

        const configuration = {
            wordsQuantity: WORDS_QUANTITY,
            codeLength: CODE_LENGTH,
        };

        main = new Main(
            configuration,
            messengerServiceMock.object,
            gameServiceMock.object,
            messageServiceMock.object
        );
    });

    afterEach(() => {
        messengerServiceMock.verifyAll();
        gameServiceMock.verifyAll();
        messageServiceMock.verifyAll();
    });

    it('Should process message', async () => {
        // Arrange

        // Act
        main.processMessage({
            message: { from: {}, text: '' },
        } as IMessageBody);

        // Assert
        expect(true).toBeTruthy();
    });
});
