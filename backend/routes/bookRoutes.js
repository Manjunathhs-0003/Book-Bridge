const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all books (public access)
router.get('/', bookController.getBooks);

// Get book by ID (public access)
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/add', authMiddleware, bookController.createBook);

// Update book availability
router.put('/update', authMiddleware, bookController.updateBookAvailability);

// Update contact and meetup details
router.put('/contact-meetup', authMiddleware, bookController.updateContactMeetupDetails);

// Get logged-in user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;