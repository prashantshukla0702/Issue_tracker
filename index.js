const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const session = require('express-session'); // to use the sessions 
const flash = require('connect-flash');

const ProjectMiddleware = require('./config/ProjectMiddleware'); // to display projects list in header

app.use(express.urlencoded({ extended: false })); // to read the form fields value from body
app.use(express.json()); // Parse JSON request bodies
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(session({
    secret: 'bugtracker',
    saveUninitialized: true,
    resave: true
}));
app.use(flash()); // Helps in Displaying flash messages
app.use((req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'), // Sets the value of success message in locals
        'error': req.flash('error') // Sets the value of error message in locals 
    }

    next();  // Move to the next middleware/route handler
});
app.use(ProjectMiddleware.getProjects);
// To mount a set of routes
app.use('/', require('./routes'));

// It will start the server
app.listen(port, (err) => {
    if (err) {
        console.log("Error in server setup");
    }
    console.log("Server is running on port", port)
});