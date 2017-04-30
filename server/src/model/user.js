"use strict";

const bookshelf = require('../config/db').bookshelf;
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const User = bookshelf.Model.extend({
        tableName: 'users',
        hidden: ['password']
    },
    {
        login: Promise.method((email, password) => {
            if (!email || !password) throw new Error('Email and password are both required');

            return new User({email: email.toLowerCase().trim()})
                .fetch({require: true})
                .tap((user) => {
                    return bcrypt.compareAsync(password, user.get('password'))
                        .then((res) => {
                            if (!res) throw new Error('Invalid password');
                        });
                })
        })
    }
);

module.exports = bookshelf.model('User', User);