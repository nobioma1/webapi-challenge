const projectDb = require('../../data/helpers/projectModel');

function validateProject(req, res, next) {
  const haveName = req.body.hasOwnProperty('name');
  const haveDescription = req.body.hasOwnProperty('description');

  if (!haveName || !haveDescription) {
    return res
      .status(400)
      .json({ error: `Fields 'name' and 'description' are required` });
  }

  if (!req.body.name.trim() || !req.body.description.trim()) {
    return res
      .status(400)
      .json({ error: `'name' and 'description' cannot be empty` });
  }

  next();
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await projectDb.get(id);
    if (!project) {
      return res.status(404).json({ error: 'Project with ID does not exist' });
    }
    req.project = project;
  } catch (error) {
    return res.status(500).json({ error: 'Unable to get product with ID' });
  }

  next();
}

module.exports = { validateProject, validateProjectId };
