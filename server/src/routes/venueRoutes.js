const express = require('express');
const router = express.Router();
const db = require('../db/database');

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

router.post('/createInvoice', async (req, res) => {
  const {
    title,
    description,
    payload,
    prices,
    photo_url,
  } = req.body;

  // Validation check for required parameters in the request body
  if (!description || !payload || !prices) {
    return res.status(400).json({ error: "Bad Request: Missing parameters" });
  }

  // Defining bot and provider tokens for communicating with the Telegram API
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const PROVIDER_TOKEN = process.env.PROVIDER_TOKEN;

  try {
    // API call to create an invoice link using provided details and provider token
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        payload: payload,
        provider_token: PROVIDER_TOKEN,
        currency: 'USD',
        prices: prices,
        photo_url: photo_url,
        need_name: true,
        need_phone_number: true
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API Error:", data.description);
      return res.status(502).json({ error: "Failed to create invoice link. Please try again later." });
    }

    // Sending JSON response received from Telegram API to the frontend
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
