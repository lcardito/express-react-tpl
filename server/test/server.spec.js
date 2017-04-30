"use strict";

const request = require('supertest');
const util = require("util");
const assert = require('chai').assert;
const server = require('./../src/server');
const superAgent = require('superagent');

describe('integration tests', () => {
    let app;
    let knex;

    before((done) => {
        app = server.app;
        if (app.isRunning) {
            knex = server.knex;
            done();
        } else {
            app.on('ready', () => {
                console.log('Server up and running');
                knex = server.knex;
                done();
            });
        }
    });

    beforeEach(() => {
        knex('users').del();

        return knex.seed.run();
    });

    describe('migration tests', () => {
        it('should run user migrations', (done) => {
            knex('users').select().then((users) => {

                assert.isDefined(users);
                assert.lengthOf(users, 2);

                done();
            });
        });

    });

    it('401 for an unauthorized user', () => {
        return request(app)
            .post('/login')
            .type('form')
            .expect(401)
            .send({'email': 'fake@unknown.com', 'password': 'blabla'});
    });

    it('200 for an authorized user', () => {
        return request(app)
            .post('/login')
            .type('form')
            .expect(200)
            .send({'email': 'gigo@gigio.com', 'password': 'password'});
    });

    describe('user is authenticated', () => {
        let user1, user2, host;

        before((done) => {

            host = 'http://localhost:' + app.get('port');

            user1 = superAgent.agent();
            user2 = superAgent.agent();

            user1.post(host + '/login')
                .send({'email': 'gigo@gigio.com', 'password': 'password'})
                .then((response) => {
                    assert.equal(response.body.username, 'luigi');
                    user1.id = response.body.id;

                    user2.post(host + '/login')
                        .send({'email': 'andrea@andy.com', 'password': 'andrea'})
                        .then((response) => {
                            assert.equal(response.body.username, 'andrea');
                            user2.id = response.body.id;
                            done();
                        });
                });
        });

    });
});