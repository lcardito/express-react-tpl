
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', (table) => {
            table.increments('id').primary().unsigned();
            table.string('username');
            table.string('password');
            table.string('email');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user')
    ]);
};