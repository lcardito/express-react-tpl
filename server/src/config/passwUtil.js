"use strict";

const bcrypt = require('bcrypt');

exports.cryptPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};

exports.comparePassword = (password, userPassword, callback) => {
    bcrypt.compare(password, userPassword, (err, isValid) => {
        if (err) {
            return callback(err);
        }
        return callback(null, isValid);
    });
};

let main = () => {
    let readline = require('readline');
    let passwUtil = require('./passwUtil');

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        passwUtil.cryptPassword(line, (err, hash) => {
            console.log(hash);
        })
    })
};

if (require.main === module) {
    main();
}