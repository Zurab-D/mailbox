const passport = require('koa-passport');
const Login = require('../models/login');

const localStrategy = require('../strategies/local');

// save login session on the server on login
passport.serializeUser((login, done) => {
    done(null, login.id); // uses _id as idFieldd
});

// check signeded in login using session data
passport.deserializeUser((id, done) => {
    // callback version checks id validity automatically
    // id got from session saved on the server
    Login.findById(id, done);
});

// done(null, login)
// OR
// done(null, false, { message: <error message> })  <- 3rd arg format is from built-in messages of strategies
passport.use(localStrategy);

module.exports = passport.initialize();
