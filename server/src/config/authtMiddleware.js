"use strict";

const winston = require('winston');
const User = require('../model/user');
const auth = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwUtil = require('./passwUtil');

auth.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
        session: true
    },
    (username, password, done) => {
        winston.info('Accessing with %s', username);
        User.where({'email': username})
            .fetch()
            .then((user) => {
                if (!user) {
                    winston.info('User %s not found', username);
                    return done(null, false);
                }
                passwUtil.comparePassword(password, user.get('password'), (err, isValid) => {
                    if (isValid) {
                        delete user["password"];
                        winston.info('Access granted for %s', username);
                        return done(null, user);
                    } else {
                        winston.warn('Invalid credentials for %s', username);
                        return done(null, false);
                    }
                });
            }).catch((e) => {
            winston.error('Something went wrong ' + e);
        });
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
