'use strict';

const passport = require('koa-passport');
const config = require('config');
const path = require('path');
const Login = require(path.join(config.root, 'models', 'login'));

module.exports = function*(next) {
console.log(`------------------------->>> sin UP`);
    let { displayName, username, email, password } = this.request.body;

    let login = yield Login.findOne({ username: username });

    if (!login) {
        login = yield Login.create({
            displayName: displayName,
            username: username,
            email: email,
            password: password
        });
    }

    // sign in
    yield passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    });

    yield * next;
};
