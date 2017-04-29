module.exports = {

    test: {
        client: 'sqlite3',
        connection: {
            database: 'cat-db',
            user: 'cat',
            password: 'pwd',
            filename: ':memory:'
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './migrations/seeds/test'
        },
        useNullAsDefault: true
    },

    dev: {
        client: 'sqlite3',
        connection: {
            database: 'cat-db',
            user: 'cat',
            password: 'pwd',
            filename: './dev.db'
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './migrations/seeds/test'
        },
        useNullAsDefault: true
    },

    docker: {
        client: 'mysql',
        connection: {
            host: '0.0.0.0',
            database: 'cat-db',
            user: 'cat',
            password: 'pwd',
            port: 3306
        },
        pool: {
            min: 1,
            max: 5
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
