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
        knex('payment').del();
        knex('bucket').del();

        return knex.seed.run();
    });

    describe('migration tests', () => {
        it('should run user migrations', (done) => {
            knex('user').select().then((users) => {

                assert.isDefined(users);
                assert.lengthOf(users, 2);

                done();
            });
        });

        it('should run buckets migrations', (done) => {
            knex('bucket').select().then((allBuckets) => {

                assert.isDefined(allBuckets);
                assert.lengthOf(allBuckets, 2);

                done();
            });
        });

        it('should run payment migrations', (done) => {
            knex('payment').select().then((allGoals) => {
                "use strict";

                assert.isDefined(allGoals);
                assert.lengthOf(allGoals, 7);

                done();
            });
        });
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

        it('user1 should see only own payments', (done) => {
            user1.get(host + '/api/payment')
                .then((response) => {
                    assert.lengthOf(response.body, 6);
                    done();
                });

        });

        it('user2 should see only own payments', (done) => {
            user2.get(host + '/api/payment')
                .then((response) => {
                    assert.lengthOf(response.body, 1);
                    done();
                });

        });

        it('should add payment for the goal if its category does not exists', (done) => {
            user1.post(host + '/api/payment')
                .send({
                    category: 'NewCategory',
                    label: 'Bike exhaust',
                    amount: 500,
                    type: 'OUT',
                    dueDate: '2017-06-30'
                })
                .then(response => {
                    assert.equal(response.body[0].label, 'Bike exhaust', util.inspect(response.body, false, null));

                    knex('payment').where({category: 'NewCategory'}).select().then((result) => {
                        assert.lengthOf(result, 1);
                        done();
                    })
                });
        });

        it('user1 should see own buckets', (done) => {
            user1
                .get(host + '/api/bucket')
                .then(response => {
                    assert.lengthOf(response.body, 1);
                    assert.equal(response.body[0].balance, 147, util.inspect(response.body, false, null));
                    done();
                });
        });

        it('user2 should see own buckets', (done) => {
            user2
                .get(host + '/api/bucket')
                .then(response => {
                    assert.lengthOf(response.body, 1);
                    assert.equal(response.body[0].balance, 58, util.inspect(response.body, false, null));
                    done();
                });
        });

        it('should save into database on post', (done) => {
            user1.post(host + '/api/payment')
                .send({category: 'Vehicles', label: 'Bike exhaust', amount: 500, dueDate: '2017-06-30'})
                .then(response => {
                    assert.equal(response.body[0].label, 'Bike exhaust', util.inspect(response.body, false, null));
                    done();
                });
        });

        it('should update into database on put', (done) => {
            user1.put(host + '/api/payment')
                .send({id: 0, category: 'NewVehicles', label: 'Bike exhaust', amount: 500, dueDate: '2017-06-30'})
                .then(response => {
                    assert.equal(response.body[0].id, 0, util.inspect(response, false, null));
                    assert.equal(response.body[0].category, 'NewVehicles', util.inspect(response, false, null));

                    done();
                });
        });

        it('user1 should delete own goal on delete', (done) => {
            knex('payment')
                .where('user_id', user1.id)
                .select()
                .limit(1)
                .then((result) => {
                    user1.del(host + '/api/payment/' + result[0].id)
                        .then(() => {
                            knex('payment')
                                .where('user_id', user1.id)
                                .select()
                                .then((payments) => {
                                    assert.lengthOf(payments, 5);
                                    done();
                                })
                        });
                });
        });

        it('user1 should be able to make a payment in', (done) => {
            user1.post(host + '/api/payment')
                .send({
                    category: 'Personal',
                    label: 'Some extra cache',
                    amount: 100,
                    dueDate: '2017-06-30',
                    type: 'IN'
                })
                .then((response) => {
                    assert.equal(response.body[0].type, 'IN', util.inspect(response.body, false, null));
                    done();
                })
        });

    });

    it('401 for an unauthorized user', () => {
        return request(app)
            .post('/login')
            .type('form')
            .expect(401)
            .send({'email': 'fake@unknown.com', 'password': 'blabla'});
    });

});