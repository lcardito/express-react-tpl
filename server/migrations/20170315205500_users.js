
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', (table) => {
            table.increments('id').primary().unsigned();
            table.string('username');
            table.string('password');
            table.string('email');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user')
    ]);
};