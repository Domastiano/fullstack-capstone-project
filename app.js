const express = require('express');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Trasy
app.use('/api', giftRoutes);      // /api/gifts, /api/gifts/:id
app.use('/api', searchRoutes);    // /api/search
app.use('/api/auth', authRoutes); // /api/auth/register, /api/auth/login

module.exports = app;
