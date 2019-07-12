const actionDb = require('../../data/helpers/actionModel');

async function getAllActions(req, res) {
  try {
    const actions = await actionDb.get();
    return res.status(200).json(actions);
  } catch (error) {
    return res.status(500).json({ error: 'Error getting actions' });
  }
}

async function getActionById(req, res) {
  return res.status(200).json(req.action);
}

async function createAction(req, res) {
  const { notes, description } = req.body;
  const newAction = {
    notes: notes.trim(),
    description: description.trim(),
    project_id: req.project.id,
  };

  try {
    const action = await actionDb.insert(newAction);
    return res.status(201).json(action);
  } catch (error) {
    return res.status(500).json({ error: 'Error adding action' });
  }
}

async function updateAction(req, res) {
  const { id } = req.action;
  const { notes, description } = req.body;
  const newAction = {
    notes: notes.trim(),
    description: description.trim(),
  };

  try {
    const actionId = await actionDb.update(id, newAction);
    return res.status(200).json(actionId);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating action' });
  }
}

async function removeAction(req, res) {
  try {
    await actionDb.remove(req.action.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting action' });
  }
}

module.exports = {
  getAllActions,
  getActionById,
  createAction,
  updateAction,
  removeAction,
};
