const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

// GET /api/gifts – wszystkie przedmioty
router.get('/api/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find({}).toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/gifts/:id – pojedynczy przedmiot
router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
