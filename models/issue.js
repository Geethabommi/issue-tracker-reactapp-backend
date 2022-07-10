const mongoose = require('mongoose');

const SchemaObj = mongoose.Schema;

const issueSchema = new SchemaObj({
  title: {
    type: String,
    // unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  author: {
    type: String,
  },
  user: {
    type: SchemaObj.Types.ObjectId,
    ref: 'User',
  },
  project: {
    type: SchemaObj.Types.ObjectId,
    ref: 'Project',
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
