"use strict";

const util = require('util');
const config = require('../../knexfile');

console.log('Knex config: ' + util.inspect(config[process.env.NODE_ENV], false, null));
let knex =  require('knex')(config[process.env.NODE_ENV]);
let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(['registry', 'visibility']);

module.exports = {
    knex: knex,
    bookshelf: bookshelf
};
