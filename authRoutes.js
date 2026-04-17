const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const db = await connectToDatabase();
  const existing = await db.collection('users').findOne({ email: req.body.email });
  if (existing) return res.status(400).json({ error: 'Email already exists' });
  const hashed = await bcrypt.hash(req.body.password, 10);
  const result = await db.collection('users').insertOne({
    email: req.body.email,
    password: hashed,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  res.status(201).json({ message: 'User created', userId: result.insertedId });
});

router.post('/login', async (req, res) => {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, firstName: user.firstName, email: user.email });
});

module.exports = router;
