require('dotenv').config();
const express = require('express');
const venueRoutes = require('./routes/venueRoutes');
const devCors = require('./middlewares/devCors');

const { startBot } = require('./bot');
startBot();

const app = express();
app.use(devCors);
app.use('/api', venueRoutes);

const PORT = 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
