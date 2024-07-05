// backend/routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed
const { createBook, getBooks, updateBookAvailability } = require('../controllers/bookController');

// Example route handler
router.get('/', getBooks);

// Secure routes with auth middleware
router.post('/add', authMiddleware, createBook);
router.put('/update', authMiddleware, updateBookAvailability);

module.exports = router;
