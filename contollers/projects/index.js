const Project = require('../../models/project');
const User = require('../../models/user');

module.exports.createProject = async (req, res) => {
  console.log(req.body);
  let projectexist = await Project.find({ title: req.body.title });
  if (projectexist.length > 0) {
    return res.json({
      message: 'Project already exists',
    });
  }
  let project = await Project.create(req.body);

  let user = await User.findById(req.body.user);

  user.projects.push(project._doc._id.toString());

  await user.save();

  console.log('project creation', project);

  return res.json({
    message: 'Project Created',
  });
};

module.exports.getAllProject = async (req, res) => {
  let project = await Project.find();

  console.log('get all project is', project);

  return res.json({
    message: 'Project Created',
    project,
  });
};

module.exports.getAllProjectFromUser = async (req, res) => {
  let project = await Project.find({ user: req.params.userID }).populate(
    'user'
  );

  console.log('project is', project);

  return res.json({
    message: 'list of Project Created',
    project,
  });
};
