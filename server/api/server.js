const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const projects = require('./routes/projectsRouter');
const actions = require('./routes/actionsRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/projects', projects);
server.use('/api/actions', actions);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to ProAct(Project/Actions)' });
});

module.exports = server;
