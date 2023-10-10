require('dotenv').config();
const express = require('express');
const venueRoutes = require('./src/routes/venueRoutes');
const devCors = require('./src/middlewares/devCors');
const populateDb = require('./src/db/populateDb');

const { startBot } = require('./src/bot');
startBot();

const app = express();
app.use(devCors);
app.use(express.json());
app.use('/api', venueRoutes);

// Start the server
const startServer = () => {
  const PORT = 80;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Populate the database and start the server
populateDb();
startServer();
