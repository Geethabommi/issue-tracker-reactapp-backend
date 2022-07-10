const express = require('express');
const {
  getAllIssues,
  createIssue,
  getSearchIssues,
} = require('../../contollers/issues');
const passport = require('../../config/passport-jwt-strategy');
const router = express.Router();

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  createIssue
);

router.get(
  '/all/:projectID',
  passport.authenticate('jwt', { session: false }),
  getAllIssues
);

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  getSearchIssues
);

module.exports = router;
