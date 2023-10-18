const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bug_tracker'); // Specify the database name to connect
const db = mongoose.connection; // connect with db

// Show the error in console if any
db.on('error', (err) => {
    console.log('Error in connecting with db', err);
});

db.once('connection', () => {
    console.log('Connected with the database');
});