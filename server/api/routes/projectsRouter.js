const express = require('express');

const projects = require('../controllers/projects');
const { validateProject, validateProjectId} = require('../middleware/projects');

const projectsRouter = express.Router();

projectsRouter.get('/', projects.getAllProjects);
projectsRouter.get('/:id/actions', validateProjectId, projects.getProjectActions);
projectsRouter.get('/:id', validateProjectId, projects.getProjectById);
projectsRouter.post('/', validateProject, projects.createProject);
projectsRouter.put('/:id', validateProjectId, validateProject, projects.updateProject);
projectsRouter.delete('/:id', validateProjectId, projects.removeProject);

module.exports = projectsRouter;
