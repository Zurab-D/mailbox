const passport = require('koa-passport');
const authorized = require('./authorized');

module.exports = function*(next) {
console.log(`---------------------->>> sign in`);
    yield passport.authenticate('local',
        { successRedirect: '/',
          failureRedirect: '/'
        }
   );

   yield * next;
};
