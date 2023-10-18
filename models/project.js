const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    }
});
// Creating a model to connect with the Projects document 
const Project = mongoose.model('project', projectSchema);
module.exports = Project;