const LocalStrategy = require('passport-local').Strategy;
const Login = require('../models/login');

module.exports = new LocalStrategy(
    {
        usernameField: 'username', // 'username' by default
        passwordField: 'password'
    },
    (username, password, done) => {
        Login.findOne({ username: username }, (err, login) => {
            if (err) return done(err);

            if (!login || !login.checkPassword(password)) {
                // don't say whether the login exists
                return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
            };

            return done(null, login);
        });
    }
);
