const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    labels: {
        type: Array,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project', // Reference to the Project model
    },
},
    {
        timestamps: true
    });

// Creating a model to connect with the Issues document 
const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;