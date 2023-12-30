import * as functions from '@google-cloud/functions-framework';
import { ConfigParameterNotDefinedError } from './error/ConfigParameterNotDefinedError';
import { Main } from './main/Main';
import { TelegramService } from './messenger/Telegram.service';
import { GameService } from './game/Game.service';
import { MessageService } from './message/Message.service';

functions.http('main', async (req, res) => {
    console.log('Triggered!');

    if (process.env.TOKEN === undefined) {
        throw new ConfigParameterNotDefinedError('TOKEN');
    }
    if (process.env.TELEGRAM_TOKEN === undefined) {
        throw new ConfigParameterNotDefinedError('TELEGRAM_TOKEN');
    }

    if (req.query.token !== process.env.TOKEN) {
        res.status(401).json({
            result: 'wrong token',
        });
        return;
    }

    const configuration = {
        wordsQuantity: 4,
        codeLength: 3,
    };

    const main = new Main(
        configuration,
        new TelegramService(process.env.TELEGRAM_TOKEN),
        new GameService(),
        new MessageService()
    );

    await main.processMessage(req.body);

    console.log('Done!');

    res.status(200).json({
        result: 'success',
    });
});
