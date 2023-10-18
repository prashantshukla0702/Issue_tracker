const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/create', ProjectController.create);
router.get('/:id', ProjectController.show);
router.post('/store', ProjectController.store);
router.post('/getissue', ProjectController.search);
router.post('/filterissue', ProjectController.filter);

// Exports all route
module.exports = router;