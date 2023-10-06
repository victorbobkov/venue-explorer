require('dotenv').config();
const express = require('express');
const venueRoutes = require('./src/routes/venueRoutes');
const devCors = require('./src/middlewares/devCors');

const { startBot } = require('./src/bot');
startBot();

const app = express();
app.use(devCors);
app.use('/api', venueRoutes);

const PORT = 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
