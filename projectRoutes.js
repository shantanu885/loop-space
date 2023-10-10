// src/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a specific project by ID
router.get('/:projectId', projectController.getProjectById);

// Update a project
router.put('/:projectId', projectController.updateProject);

// Delete a project
router.delete('/:projectId', projectController.deleteProject);

module.exports = router;
