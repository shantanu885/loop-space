// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        username,
        password: hashedPassword
      });

      await user.save();

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // ...
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;
