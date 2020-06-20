[![Build Status](https://travis-ci.org/zinovik/decrypto-board-game-bot.svg?branch=master)](https://travis-ci.org/zinovik/decrypto-board-game-bot)

![logo](./avatar/decrypto-board-game-bot.jpg)

# DecryptoBoardGameBot

The bot for playing Decrypto board game, you must use it only to try how it works, then please buy the game itself ;)

## you can check how it works here

Dev ([@DecryptoBoardGameBot](https://t.me/decryptoboardgamebot)):

---

## 0. Setting the bot

### 0.1. for the development

```bash
~/ngrok http 9000

curl https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook?url=https://<NGROK ID>.ngrok.io/message?token=<TOKEN>
```

### 0.2. for the production

Vercel Serverless:

```bash
curl https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook?url=https://decrypto-board-game-bot-git-vercel.zinovik.vercel.app/api/message?token=<TOKEN>
```

---

## 1. Working locally

### 1.1. create and fill .env file (use .env.example for help)

### 1.2. start the project

You can start project as lambda function:

```bash
npm run start:dev
```

### 1.3. you can involve the function locally

```bash
curl localhost:3000/api/message
```

---
