const db = require('./database');
const { venueTypes, venues } = require('./constants');

const populateDb = () => {
  // Check if data already exists
  db.get('SELECT count(id) as count FROM venueTypes', [], (err, row) => {
    if (err) return console.error(err.message);
    // If no data exists, populate tables
    if (row.count === 0) {
      // Insert venue types
      venueTypes.forEach(({ id, type, iconPath }) => {
        db.run('INSERT INTO venueTypes (id, type, iconPath) VALUES (?, ?, ?)', [id, type, iconPath]);
      });
    }
  });

  db.get('SELECT count(id) as count FROM venues', [], (err, row) => {
    if (err) return console.error(err.message);
    if (row.count === 0) {
      // Insert venues
      venues.forEach(({ id, name, typeId, rating, price, imageUrls, description, amenities }) => {
        db.run(
          `INSERT INTO venues (id, name, typeId, rating, price, imageUrls, description, amenities) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, name, typeId, rating, price, JSON.stringify(imageUrls), description, JSON.stringify(amenities)],
          function(err) {
            if (err) return console.log(err.message);
          }
        );
      });
      console.log('Database has been populated!');
    }
  });
}

module.exports = populateDb;

