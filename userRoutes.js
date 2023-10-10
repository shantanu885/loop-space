// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get('/:userId', userController.getUserProfile);

// Update user profile
router.put('/:userId', userController.updateUserProfile);

module.exports = router;
