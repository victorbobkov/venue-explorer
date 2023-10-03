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

module.exports = router;
