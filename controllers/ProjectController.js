const Project = require('../models/project');
const Issue = require('../models/issue');

// Render the project create form
const create = (req, res) => {
    return res.render('project/createform', {
        title: 'Create | Project'
    });
}

// Store the project info
const store = async (req, res) => {
    await Project.create({
        name: req.body.pname,
        author: req.body.author,
        description: req.body.desc
    })
        .then((data) => {
            req.flash('success', 'Project Created!');
            res.redirect('back');
        })
        .catch((err) => {
            console.log('Error', err);
            req.flash('error', 'Project Created!');
            res.redirect('back');
        });
}

// Show all bugs associated with the particular project
const show = async (req, res) => {
    let pid = req.params.id;
    let projectdetail, issue;
    await Project.findById(pid)
        .then(async (data) => {
            projectdetail = data;
            return await Issue.find({ project: pid }); // get issues of the specific product
        })
        .then((data2) => {
            issue = data2;
            const projectLabels = [...new Set(issue.flatMap(s => s.labels))]; // create a new array of distinct labels
            const authorNames = [... new Set(issue.flatMap(a => a.author))];// create a new array of distinct author names
            let result = {
                issue, projectdetail, projectLabels, authorNames  // Store the data in one variable
            }

            return res.render('project/view-project', {
                result,
                title: 'View | Project'
            });
        })

        .catch((err) => {
            console.log('Error', err);
        });
}

// Search the bugs in the list by title and description
const search = async (req, res) => {
    const keyword = req.body.query.trim();
    const project = req.body.pid;
    const searchRegex = new RegExp(keyword, 'i');
    await Issue.find({
        $and: [                     // To check the 2 conditions
            { project: project },
            {
                $or: [              // To check the value in both the fields
                    { title: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } }
                ]
            }
        ]
    }).then((data) => {
        return res.json(data);
    }).catch((err) => {
        console.log('Error', err);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// filter the bugs by labels 
const filter = async (req, res) => {

    const { labels, author, pid } = req.body; // retrieve the value of labels and author from request
    const filterFields = {};
    if (labels) {
        if (labels.length > 0) {
            filterFields.labels = { $in: labels }; // Match bugs with any of the selected labels
        }
    }
    if (author) {
        if (author.length > 0) {
            filterFields.author = author; // Match bugs with the specified author
        }
    }
    // Query your database to filter bugs by labels and author
    await Issue.find({
        $and: [filterFields, { project: pid }]
    }).then((filteredBugs) => {
        return res.json(filteredBugs);
    }).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });

}

// Export all functions 
module.exports = { create, store, show, search, filter };