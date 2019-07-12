const express = require('express');
const actions = require('../controllers/actions');
const { validateAction, validateActionId } = require('../middleware/actions');
const { validateProjectId } = require('../middleware/projects');

const actionsRouter = express.Router();

actionsRouter.get('/', actions.getAllActions);
actionsRouter.get('/:id', validateActionId, actions.getActionById);
actionsRouter.post('/:id', validateProjectId, validateAction, actions.createAction); // projectId
actionsRouter.put('/:id', validateActionId, validateAction, actions.updateAction);
actionsRouter.delete('/:id', validateActionId, actions.removeAction);

module.exports = actionsRouter;
