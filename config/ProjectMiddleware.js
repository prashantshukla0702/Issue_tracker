const Project = require('../models/project');

module.exports.getProjects = async (req, res, next) => {
    await Project.find({})
        .then((projects) => {
            res.locals.projects = projects; // Attach the projects data to res.locals
            next(); // Move to the next middleware/route handler
        })
        .catch((err) => {
            console.error('Error fetching projects:', err);
            return next(err); // Pass the error to the error handler middleware
        });
}