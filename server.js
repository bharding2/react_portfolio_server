const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;
const projectsRouter = require(__dirname + '/routes/projects_router');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/projectsDB');

app.use('/api', projectsRouter);

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
