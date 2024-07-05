const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get logged-in user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user contact details
router.put('/contact-details', authMiddleware, userController.updateContactDetails);

module.exports = router;