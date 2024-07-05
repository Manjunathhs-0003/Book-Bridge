const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all books
router.get('/', bookController.getBooks);

// Get book by ID
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/add', authMiddleware, bookController.createBook);

// Update book availability
router.put('/update', authMiddleware, bookController.updateBookAvailability);

// Update contact and meetup details
router.put('/contact-meetup', authMiddleware, bookController.updateContactMeetupDetails);

module.exports = router;