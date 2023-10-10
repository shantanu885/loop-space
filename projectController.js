// src/controllers/projectController.js

const Project = require('../models/Project');

const projectController = {
  createProject: async (req, res) => {
    try {
      const { title, description } = req.body;
      const developer = req.user; // Assuming user information is stored in req.user after authentication

      const project = new Project({
        title,
        description,
        developer
      });

      await project.save();

      res.status(201).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find().populate('developer', 'username'); // Populate developer information

      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId).populate('developer', 'username');

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { projectId } = req.params;
      const updatedProject = req.body;

      const project = await Project.findByIdAndUpdate(projectId, updatedProject, { new: true });

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findByIdAndDelete(projectId);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = projectController;
