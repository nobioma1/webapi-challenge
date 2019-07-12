const projectDb = require('../../data/helpers/projectModel');

async function getAllProjects(req, res) {
  try {
    const projects = await projectDb.get();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: 'Error getting projects' });
  }
}

async function getProjectById(req, res) {
  return res.status(200).json(req.project);
}

async function getProjectActions(req, res) {
  try {
    const projectActions = await projectDb.getProjectActions(req.project.id);
    return res.status(200).json(projectActions);
  } catch (error) {
    return res.status(500).json({ error: 'Error getting project actions' });
  }
}

async function createProject(req, res) {
  const { name, description } = req.body;
  const newProject = {
    name: name.trim(),
    description: description.trim(),
  };

  try {
    const projectId = await projectDb.insert(newProject);
    return res.status(201).json(projectId);
  } catch (error) {
    return res.status(500).json({ error: 'Error adding project' });
  }
}

async function updateProject(req, res) {
  const { id } = req.project;
  const { name, description } = req.body;
  const projectChanges = {
    name: name.trim(),
    description: description.trim(),
  };

  try {
    const project = await projectDb.update(id, projectChanges);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating project' });
  }
}

async function removeProject(req, res) {
  try {
    await projectDb.remove(req.project.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting project' });
  }
}

module.exports = {
  getAllProjects,
  getProjectActions,
  createProject,
  removeProject,
  updateProject,
  getProjectById,
};
