const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/user');



// tell passport to use a new strategy for google login
passport.use(new FacebookStrategy({
        clientID: "590971581520059",
        clientSecret: "8aba3aa8dddf65900380ba1f29eb12ef",
        callbackURL: "https://developer-1265.herokuapp.com/users/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email'],
        enableProof: true
    },

    function(accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
            if (err) { console.log('error in facebook-strategy-passport', err); return; }
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if (err) { console.log('error in creating user facebook strategy-passport', err); return; }

                    return done(null, user);
                });
            }

        });
    }


));


module.exports = passport;