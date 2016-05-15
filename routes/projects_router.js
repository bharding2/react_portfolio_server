const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Project = require(__dirname + '/../models/project');
const handleErr = require(__dirname + '/../lib/handle_err');

var projectsRouter = module.exports = Router();

projectsRouter.post('/projects', bodyParser, (req, res) => {
  var newProject = new Project(req.body);
  newProject.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

projectsRouter.get('/projects', (req, res) => {
  Project.find(null, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

projectsRouter.get('/projects/:name', (req, res) => {
  Project.findOne({ _id: req.params.name }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

projectsRouter.put('/projects/:name', bodyParser, (req, res) => {
  var projectData = req.body;
  delete projectData._id;
  Project.update({ name: req.params.name }, projectData, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'project updated' });
  });
});

projectsRouter.delete('/projects/:name', (req, res) => {
  Project.findOneAndRemove({ name: req.params.name }, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'project deleted' });
  });
});
