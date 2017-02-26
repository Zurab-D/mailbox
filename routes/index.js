'use strict';

const Router = require('koa-router');
const handlerGet = require('./get');
const handlerPost = require('./post');
const handlerPatch = require('./patch');
const handlerDelete = require('./delete');
const params = require('./params');


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


module.exports = app => {
    //const router = new Router({prefix: '/api/users'});
    const router = new Router();
    params(router);

    // -------------------------------------------------------- //
    // router.get('/',                  handlerGet.getAllDB);
    router.post('/',                    handlerPost.addAnyDbObjects);

    // -------------------------------------------------------- //
    router.post('/users',               handlerPost.AddUsers);
    router.get('/users',                handlerGet.getAllUsers);
    router.get('/users/:user',          handlerGet.getUserById);
    /*
    router.patch('/users/:id',          handlerPatch.patchUser);
    router.delete('/users/',            handlerPatch.deleteAllUsers);
    router.delete('/users/:id',         handlerPatch.deleteUser);
    */

    // -------------------------------------------------------- //
    router.post('/letters',             handlerPost.AddLetters);
    router.get('/letters',              handlerGet.getAllLetters);
    router.get('/letters/:letter',      handlerGet.getLetterById);
    /*
    router.patch('/letters/:id',        handlerPatch.patchLetter);
    router.delete('/letters/',          handlerPatch.deleteAllLetters);
    router.delete('/letters/:id',       handlerPatch.deleteLetter);
    */
    // -------------------------------------------------------- //

    router.post('/mailboxes',           handlerPost.AddMailboxes);
    router.get('/mailboxes',            handlerGet.getAllMailboxes);
    router.get('/mailboxes/:mailbox',   handlerGet.getMailboxById);
    /*
    router.patch('/mailboxes/:id',      handlerPatch.patchMailbox);
    router.delete('/mailboxes/',        handlerPatch.deleteAllMailboxes);
    router.delete('/mailboxes/:id',     handlerPatch.deleteMailbox);
    */

    app.use(router.routes());
    return router;
};
