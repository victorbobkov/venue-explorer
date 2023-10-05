const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'mydb.sqlite3');

// Open the database
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Define Schema and create tables
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS venueTypes (id INTEGER PRIMARY KEY, type TEXT, iconPath TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS venues (id INTEGER PRIMARY KEY, name TEXT, typeId INTEGER, rating REAL, price INTEGER, imageUrl TEXT, description TEXT, FOREIGN KEY (typeId) REFERENCES venueTypes (id))');
  db.run('CREATE TABLE IF NOT EXISTS amenities (venueId INTEGER, amenity TEXT, FOREIGN KEY (venueId) REFERENCES venues (id))');
});

module.exports = db;
