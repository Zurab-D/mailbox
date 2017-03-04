const passport = require('koa-passport');
const authorized = require('./authorized');

module.exports = function*(next) {
    yield passport.authenticate('local',
        { successRedirect: '/',
          failureRedirect: '/'
        }
   );

   yield * next;
};
