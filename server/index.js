require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const db = require('./src/db/database');

const TOKEN = process.env.TELEGRAM_BOT_TEST_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const webAppUrl = 'https://venue-explorer.vercel.app/';
const PORT = 80;
const app = express();
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'https://venue-explorer.vercel.app/']
}));

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
  db.all('SELECT * FROM venues', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/venues/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM venues WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      db.all('SELECT amenity FROM amenities WHERE venueId = ?', [id], (err, amenities) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        row.amenities = amenities.map(a => a.amenity);
        res.json(row);
      });
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
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
