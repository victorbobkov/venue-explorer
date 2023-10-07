const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://venue-explorer.vercel.app/';

const bot = new TelegramBot(TOKEN, { polling: true });

const startBot = () => {
  bot.on('message',  async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Adventure Awaits! 🌍\n\nTap below and let\'s discover your next charming venue together!', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Start Booking', web_app: { url: webAppUrl }}],
        ],
        resize_keyboard: true,
      }
    });
  });

  // Handling pre-checkout query
  bot.on('pre_checkout_query', (preCheckoutQuery) => {
    console.log("PreCheckoutQuery:", preCheckoutQuery);
    bot.answerPreCheckoutQuery(preCheckoutQuery.id, true)
      .then((result) => {
        console.log("PreCheckoutQuery answered:", result);
      })
      .catch((error) => {
        console.error("Error in answering PreCheckoutQuery:", error);
      });
  });

  // Handling successful payment
  bot.on('successful_payment', (message) => {
    bot.sendMessage(message.chat.id, "Thank you for your payment!");
  });

  console.log('Bot is running...')
};

module.exports = { bot, startBot };

