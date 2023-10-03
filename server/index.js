require('dotenv').config();
const express = require('express');
const venueRoutes = require('./src/routes/venueRoutes');
const devCors = require('./src/middlewares/devCors');

const app = express();
app.use(devCors);
app.use('/api', venueRoutes);

const PORT = 80;
app.listen(PORT, () => console.log(`Bot is up and running on port ${PORT}`));
