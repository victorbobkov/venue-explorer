const db = require('./database');
const { venueTypes, venues } = require('./constants');

// Insert venue types
venueTypes.forEach(({ type, iconPath }) => {
  db.run('INSERT INTO venueTypes (type, iconPath) VALUES (?, ?)', [type, iconPath]);
});

// Insert venues and amenities
venues.forEach(({ id, name, type, rating, price, imageUrl, description, amenities }) => {
  db.run(`INSERT INTO venues (id, name, type, rating, price, imageUrl, description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, name, type, rating, price, imageUrl, description], function(err) {
    if (err) return console.log(err.message);

    // get the last insert id
    const venueId = this.lastID;

    // Insert amenities for this venue
    amenities.forEach((amenity) => {
      db.run('INSERT INTO amenities (venueId, amenity) VALUES (?, ?)', [venueId, amenity]);
    });
  });
});

console.log('Database has been populated!');
