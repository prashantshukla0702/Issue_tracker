const express = require('express');
const router = express.Router();
const IssueController = require('../controllers/IssueController');

router.get('/create/:pid', IssueController.create);
router.post('/store', IssueController.store);

// Exports all route
module.exports = router;
