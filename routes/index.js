const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController')

router.get('/', homeController.home);
router.use('/project', require('./project'));
router.use('/issue', require('./issue'));

module.exports = router;
