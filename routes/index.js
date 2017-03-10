'use strict';

/*
GET /iliakan – вернуть всю базу
GET /iliakan/users – вернуть всех пользователей
GET /iliakan/users/:id – вернуть пользователя с данным _id

POST /iliakan – добавить много разных объектов одним запросом
POST /iliakan/users – добавить одного пользователя

PATCH /iliakan/users/:id – обновить пользователя с данным _id

DELETE /iliakan – удалить всю базу
DELETE /iliakan/users – удалить всех пользователей
DELETE /iliakan/users/:id – удалить пользователя с данным _id
*/


// const Router = require('koa-router');
const params = require('./params');
const handlerGet = require('./get');
const handlerPost = require('./post');
const handlerPatch = require('./patch');
const handlerDelete = require('./delete');
const auth = require('./auth');


module.exports = (app, router) => {
    // const router = new Router({prefix: '/api/users'});
    // const router = new Router();

    // check if user is authenticated
    app.use(function* (next) {
      const pathname = decodeURI(require('url').parse(this.request.url).pathname).toLowerCase();

      if (pathname === '/signin' || pathname === '/signup' || pathname === '/authorized' || this.isAuthenticated()) {
          yield * next;
      } else {
          this.throw(403);
      }
    });


    params(router);

    // router.get('/',                  handlerGet.getAllDB);
    router.post('/',                    handlerPost.addAnyDbObjects);
    // ------------------------------------------------------------------ //

    router.get('/users',                handlerGet.getAllUsers);
    router.get('/users/:user',          handlerGet.getUserById);
    router.post('/users',               handlerPost.AddUsers);
    router.patch('/users/:user',        handlerPatch.patchUser(router));
    router.delete('/users/',            handlerDelete.deleteAllUsers);
    router.delete('/users/:user',       handlerDelete.deleteUser);
    // ------------------------------------------------------------------ //

    router.get('/letters',              handlerGet.getAllLetters);
    router.get('/letters/:letter',      handlerGet.getLetterById);
    router.post('/letters',             handlerPost.AddLetters);
    router.patch('/letters/:letter',    handlerPatch.patchLetter(router));
    router.delete('/letters/',          handlerDelete.deleteAllLetters);
    router.delete('/letters/:letter',   handlerDelete.deleteLetter);
    // ------------------------------------------------------------------ //

    router.get('/mailboxes',            handlerGet.getAllMailboxes);
    router.get('/mailboxes/:mailbox',   handlerGet.getMailboxById);
    router.post('/mailboxes',           handlerPost.AddMailboxes);
    router.patch('/mailboxes/:mailbox', handlerPatch.patchMailbox(router));
    router.delete('/mailboxes/',        handlerDelete.deleteAllMailboxes);
    router.delete('/mailboxes/:mailbox',handlerDelete.deleteMailbox);
    // ------------------------------------------------------------------ //

    router.post('/signup',          auth.signup);
    router.post('/signin',          auth.signin);
    router.get('/authorized',       auth.authorized);
    router.get('/logout',           auth.logout);
    router.get('/salt/:saltuser',   auth.salt);
    // ------------------------------------------------------------------ //

    app.use(router.routes());
    return router;
};
