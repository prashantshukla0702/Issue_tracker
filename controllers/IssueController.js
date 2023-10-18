const express = require('express');
const Issue = require('../models/issue');


//Function to show the Issue create form 
const create = (req, res) => {
    res.render('report-issue', {
        title: "Report | Issue",
        pid: req.params.pid
    });
}

// Store the Issue into the db
const store = (req, res) => {
    Issue.create({
        title: req.body.title,
        author: req.body.author,
        labels: (req.body.label).split(',').map(value => value.trim()),
        description: req.body.desc,
        project: req.body.pid
    })
        .then((data) => {
            req.flash('success', 'Issue Created!');
            res.redirect('back');

        })
        .catch((err) => {
            console.log('Error', err);
            req.flash('error', 'Something went wrong!');
            res.redirect('back');
        });
}

// Export all functions 
module.exports = { create, store };