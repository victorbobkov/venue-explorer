const db = require('./database');
const { venueTypes, venues } = require('./constants');

// Insert venue types
venueTypes.forEach(({ id, type, iconPath }) => {
  db.run('INSERT INTO venueTypes (id, type, iconPath) VALUES (?, ?, ?)', [id, type, iconPath]);
});

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
