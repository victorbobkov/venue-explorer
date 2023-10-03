require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const db = require('./src/db/database');
const devCors = require('./src/middlewares/devCors');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const webAppUrl = 'https://venue-explorer.vercel.app/';
const PORT = 80;
const middlewares = [
  devCors,
];

const app = express();
app.use(middlewares);

// API Endpoints
app.get('/api/venueTypes', (req, res) => {
  db.all('SELECT * FROM venueTypes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/venues', (req, res) => {
  db.all('SELECT * FROM venues', [], async (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Fetch amenities for each venue
    const venuesWithAmenities = await Promise.all(rows.map(async venue => {
      return new Promise((resolve, reject) => {
        db.all('SELECT amenity FROM amenities WHERE venueId = ?', [venue.id], (err, amenities) => {
          if (err) {
            reject(err);
            return;
          }
          venue.amenities = amenities.map(a => a.amenity);
          resolve(venue);
        });
      });
    }));

    res.json(venuesWithAmenities);
  });
});

// Bot logic
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
