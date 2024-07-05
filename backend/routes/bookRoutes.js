const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all books
router.get('/', bookController.getBooks);

// Create a new book
router.post('/add', authMiddleware, bookController.createBook);

// Update book availability
router.put('/update', authMiddleware, bookController.updateBookAvailability);

module.exports = router;