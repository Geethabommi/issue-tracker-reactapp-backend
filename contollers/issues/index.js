const Issue = require('../../models/issue');
const Project = require('../../models/project');

module.exports.createIssue = async (req, res) => {
  try {
    let project = await Project.findById(req.body.project);
    if (project) {
      let searchvar = {
        title: req.body.title,
        project: req.body.project,
      };
      let issueTitle = await Issue.find(searchvar);
      console.log('issueTitle', issueTitle);
      if (issueTitle.length > 0) {
        return res.json({
          message: 'Issue title already existed',
        });
      }
      let issue = await Issue.create(req.body);

      if (issue) {
        project.issues.push(issue._doc._id.toString());

        project.save();

        return res.json({
          message: 'Issue created successfully!',
          issueID: issue._doc._id.toString(),
        });
      } else {
        return res.json({
          message: 'Issue not created!',
        });
      }
    }
    return res.json({
      message: 'Project not created!',
    });
  } catch (error) {
    console.dir(error);
  }
};

module.exports.getAllIssues = async (req, res) => {
  try {
    let issues = await Issue.find({ project: req.params.projectID })
      .populate('project')
      .populate('user');

    if (issues) {
      if (issues.length === 0) {
        return res.json({
          message: 'Issues not found for project!',
        });
      }

      return res.json({
        message: 'Issue fetched successfully!',
        issues,
      });
    }

    return res.json({
      message: 'Issues not found!',
    });
  } catch (error) {
    console.dir(error);
  }
};

module.exports.getSearchIssues = async (req, res) => {
  try {
    console.log(req.query);
    let searchvarCondition = {};
    let title = req.query.title;
    let description = req.query.description;
    let label = req.query.label;
    let author = req.query.author;
    let project = req.query.project;
    if (title) {
      searchvarCondition['title'] = title;
    }
    if (description) {
      searchvarCondition['description'] = description;
    }
    if (label) {
      searchvarCondition['label'] = label;
    }
    if (author) {
      searchvarCondition['author'] = author;
    }
    if (project) {
      searchvarCondition['project'] = project;
    }
    console.log(searchvarCondition);
    let issues = await Issue.find(searchvarCondition);

    console.log('after find', issues);
    if (issues) {
      if (issues.length === 0) {
        return res.json({
          message: 'Searched Issues not found for project!',
          issues,
        });
      }

      return res.json({
        message: 'Searched Issue fetched successfully!',
        issues,
      });
    }

    return res.json({
      message: 'Searched Issues not found!',
      issues,
    });
  } catch (error) {
    console.dir(error);
  }
};
