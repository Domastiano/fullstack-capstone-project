const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

router.get('/api/search', async (req, res) => {
  try {
    const { category } = req.query;
    const db = await connectToDatabase();
    let query = {};
    if (category) query.category = { $regex: new RegExp(category, 'i') };
    const items = await db.collection('items').find(query).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
