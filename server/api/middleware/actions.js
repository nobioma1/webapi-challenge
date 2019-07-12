const actionDb = require('../../data/helpers/actionModel');

async function validateActionId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await actionDb.get(id);
    if (!action) {
      return res.status(404).json({ error: 'Action with ID does not exist' });
    }
    req.action = action;
  } catch (error) {
    return res.status(500).json({ error: 'Unable to get action with ID' });
  }

  next();
}

function validateAction(req, res, next) {
  const haveNotes = req.body.hasOwnProperty('notes');
  const haveDescription = req.body.hasOwnProperty('description');

  if (!haveNotes || !haveDescription) {
    return res
      .status(400)
      .json({ error: `Fields 'notes' and 'description' are required` });
  }

  if (!req.body.notes.trim() || !req.body.description.trim()) {
    return res
      .status(400)
      .json({ error: `'notes' and 'description' cannot be empty` });
  }

  next();
}

module.exports = { validateAction, validateActionId };
