const express = require('express');
const app = express();
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(express.json());
app.use('/', giftRoutes);
app.use('/', searchRoutes);

module.exports = app;
