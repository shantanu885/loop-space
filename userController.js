// src/controllers/userController.js

const User = require('../models/User');

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedProfile = req.body;

      // Update user profile
      const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
