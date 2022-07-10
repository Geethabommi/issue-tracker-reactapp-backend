const express = require('express');
const userRoutes = require('./users');
const projectRoutes = require('./projects');
const issueRoutes = require('./issues');


const router = express.Router();


router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/issue', issueRoutes);





module.exports = router;