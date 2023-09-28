require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const webAppUrl = 'https://venue-explorer.vercel.app/';
const PORT = 8000;
const app = express();

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 'Welcome to the Venue Booking Bot! \n\nPlease tap the button below to get started.', {
    reply_markup: {
      inline_keyboard: [
        [{text: 'Start Booking', web_app: { url: webAppUrl }}]
      ],
      resize_keyboard: true,
    }
  })
});

app.listen(PORT, () => console.log(`Bot is up and running on port ${PORT}`));
