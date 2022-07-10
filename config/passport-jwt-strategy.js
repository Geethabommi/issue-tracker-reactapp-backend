var passport = require('passport');
var passportJWT = require('passport-jwt');
const User = require('../models/user');
require('dotenv').config();

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;
