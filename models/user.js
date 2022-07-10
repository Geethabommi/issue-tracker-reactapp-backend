const mongoose = require('mongoose');

const SchemaObj = mongoose.Schema;


const userSchema = new SchemaObj({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    projects: [{

        type: SchemaObj.Types.ObjectId,
        ref: 'Project'

    }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;