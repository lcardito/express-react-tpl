"use strict";

const util = require('util');
const config = require('../../knexfile');

console.log('Knex config: ' + util.inspect(config[process.env.NODE_ENV], false, null));
module.exports = require('knex')(config[process.env.NODE_ENV]);
