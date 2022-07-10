const express = require('express');
const router = express.Router();
const passport = require('../../config/passport-jwt-strategy');
const { createProject, getAllProject, getAllProjectFromUser } = require('../../contollers/projects');

router.post('/create', passport.authenticate('jwt', {session: false})  , createProject);

router.get('/all/:userID', passport.authenticate('jwt', {session: false})  , getAllProjectFromUser);

router.get('/all', passport.authenticate('jwt', {session: false})  , getAllProject);





module.exports = router;