const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Project = require(__dirname + '/../models/project');
const handleErr = require(__dirname + '/../lib/handle_err');

var projectsRouter = module.exports = Router();

projectsRouter.post('/projects', bodyParser, (req, res) => {
  var newProject = new Project(req.body);

  if (req.body.categories) {
      newProject.categories = [];
      req.body.categories.split(',').forEach((ele) => {
        newProject.categories.push(ele);
      });
    }

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

projectsRouter.get('/projects/:id', (req, res) => {
  Project.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

projectsRouter.put('/projects/:id', bodyParser, (req, res) => {
  var projectData = req.body;
  delete projectData._id;
  Project.update({ _id: req.params.id }, projectData, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'project updated' });
  });
});

projectsRouter.delete('/projects/:id', (req, res) => {
  Project.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) return handleErr(err, res);
    res.status(200).json({ msg: 'project deleted' });
  });
});
