const Project = require('../models/project');

// Funtion to render the home page
module.exports.home = function (req, res) {

    return res.render('home', {
        title: 'Home Page',
    });

}
