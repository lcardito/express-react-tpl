"use strict";

const winston = require('winston');
const User = require('../model/user');
const auth = require('passport');
const LocalStrategy = require('passport-local').Strategy;

auth.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
        session: true
    },
    (username, password, done) => {
        winston.info('Accessing with %s', username);
        User.login(username, password)
            .then((user) => {
                return done(null, user);
            })
            .catch((e) => {
                winston.error('Something went wrong ' + e);
                return done(null, false);
            })
    }
));

auth.serializeUser((user, cb) => {
    cb(null, user.id);
});

auth.deserializeUser((id, cb) => {
    User.where({id: id}).then((user) => {
        cb(null, user);
    })
});

module.exports = auth;
