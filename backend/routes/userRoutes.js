const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;