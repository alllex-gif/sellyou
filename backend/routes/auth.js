const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Sign up route (public)
router.post('/signup', authController.signup);

// Login route (public)
router.post('/login', authController.login);

// Get current user (protected - requires token)
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
