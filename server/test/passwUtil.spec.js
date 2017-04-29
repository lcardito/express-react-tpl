"use strict";

const util = require("util");
const assert = require('chai').assert;

describe('password encrypting module using bcrypt', () => {
    let passwUtil = require('./../src/config/passwUtil');

    it('should encrypt password', (done) => {
        passwUtil.cryptPassword('somePassword', (err, hash) => {
            assert.isDefined(hash);
            done();
        });
    });

    it('should return is valid for an hashed password', (done) => {
        passwUtil.cryptPassword('somePassword', (err, hash) => {
            passwUtil.comparePassword('somePassword', hash, (err, isValid) => {
                assert.isNull(err);
                assert.isTrue(isValid);
                done();
            });
        });
    });
});
