
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('user', (table) => {
            table.increments('id').primary().unsigned();
            table.string('username');
            table.string('password');
            table.string('email');
            table.timestamp('createdDate');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user')
    ]);
};