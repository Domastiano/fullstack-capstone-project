const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db');
const router = express.Router();

router.post('/api/register', async (req, res) => { /* rejestracja */ });
router.post('/api/login', async (req, res) => { /* logowanie i JWT */ });
router.put('/api/user/:id', async (req, res) => { /* aktualizacja danych */ });
module.exports = router;
