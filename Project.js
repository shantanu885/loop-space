// src/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Add any other project details you need
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
