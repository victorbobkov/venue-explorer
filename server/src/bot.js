const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://venue-explorer.vercel.app/';

const bot = new TelegramBot(TOKEN, { polling: true });

const startBot = () => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Adventure Awaits! 🌍\n\nTap below and let\'s discover your next charming venue together!', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Start Booking', web_app: { url: webAppUrl }}],
          // [{text: 'Make a Test Payment', callback_data: 'pay'}]
        ],
        resize_keyboard: true,
      }
    })
  });

  // // Handling button clicks
  // bot.on('callback_query', async (query) => {
  //   if (query.data === 'pay') {
  //     await bot.sendInvoice(
  //       query.from.id,
  //       "Test Product",
  //       "Example description",
  //       "payload",
  //       process.env.PROVIDER_TOKEN,
  //       "USD",
  //       [{"label": "Test Product", "amount": 1000}], // amount in the smallest currency unit
  //     );
  //   }
  // });
  //
  // // Handling pre-checkout query
  // bot.on('pre_checkout_query', (query) => {
  //   bot.answerPreCheckoutQuery(query.id, true).catch(console.error);
  // });
  //
  // // Handling successful payment
  // bot.on('successful_payment', (message) => {
  //   bot.sendMessage(message.chat.id, "Thank you for your payment!");
  // });

  console.log('Bot is running...')
};

module.exports = { bot, startBot };

