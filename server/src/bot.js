const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TELEGRAM_BOT_TEST_TOKEN;
const webAppUrl = 'https://venue-explorer.vercel.app/';

// Initialize the Telegram Bot
const bot = new TelegramBot(TOKEN, { polling: true });

const startBot = () => {
  // Event listener for every incoming message
  bot.on('message',  async (msg) => {
    const chatId = msg.chat.id;

    // Send a message with an inline keyboard that contains a web app button
    await bot.sendMessage(chatId, 'Adventure Awaits! 🌍\n\nTap below and let\'s discover your next charming venue together!', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Start Booking', web_app: { url: webAppUrl }}],
        ],
        resize_keyboard: true,
      }
    });
  });

  // Event listener for pre-checkout queries, an essential step before finalizing payment
  bot.on('pre_checkout_query', (preCheckoutQuery) => {
    console.log("PreCheckoutQuery:", preCheckoutQuery);

    // Approving the incoming pre-checkout query from the Telegram API
    bot.answerPreCheckoutQuery(preCheckoutQuery.id, true)
      .then((result) => {
        console.log("PreCheckoutQuery answered:", result);
      })
      .catch((error) => {
        console.error("Error in answering PreCheckoutQuery:", error);
      });
  });

  // Event listener for successful payment, for additional processing or sending a thank-you message
  bot.on('successful_payment', (message) => {
    bot.sendMessage(message.chat.id, "Thank you for your payment!");
  });

  console.log('Bot is running...')
};

// Exporting the bot and startBot function to be used in other modules
module.exports = { bot, startBot };

