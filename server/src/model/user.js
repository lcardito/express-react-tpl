"use strict";

const bookshelf = require('../config/db').bookshelf;

const User = bookshelf.Model.extend({
    tableName: 'users'
});

module.exports = bookshelf.model('User', User);