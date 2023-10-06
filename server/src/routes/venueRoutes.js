const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { bot } = require('../bot.js');

router.get('/venueTypes', (req, res) => {
  db.all('SELECT * FROM venueTypes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.get('/venues', (req, res) => {
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

router.post('/create-invoice-link', async (req, res) => {
  const {
    description,
    payload,
    prices
  } = req.body;

  if (!description || !payload || !prices) {
    return res.status(400).json({ error: "Bad Request: Missing parameters" });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const PROVIDER_TOKEN = process.env.PROVIDER_TOKEN;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: "Booking",
        description: description,
        payload: payload,
        provider_token: PROVIDER_TOKEN,
        currency: 'USD',
        prices: prices,
        // photo_url: 'https://image-url.png',
        need_name: true,
        need_phone_number: true
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
