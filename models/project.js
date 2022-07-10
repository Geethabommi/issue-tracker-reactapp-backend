const mongoose = require('mongoose');

const SchemaObj = mongoose.Schema;


const projectSchema = new SchemaObj({
    title : {
        type: String,
        unique: true,
        required: true,
    },

    description: {
        type:String,
    },

    user: {
        type: SchemaObj.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    issues: [
        {
            type: SchemaObj.Types.ObjectId,
            ref: 'Issue'
        }
    ]
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;