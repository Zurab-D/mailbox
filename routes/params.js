'use strict';

const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

function setParamHandler(router, paramName, Model) {
    router.param(paramName, function*(id, next) {
       if (!mongoose.Types.ObjectId.isValid(id)) {
           this.throw(404);
       };

       this.objById = yield Model.findById(id, {__v:0});

       if (!this.objById) {
           this.throw(404);
       };

       yield* next;
    });
}

module.exports = function(router) {
    const Mailbox = require(path.join(config.root, 'models', `mailbox.js`));
    setParamHandler(router, 'mailbox', Mailbox)

    const Letter = require(path.join(config.root, 'models', `letter.js`));
    setParamHandler(router, 'letter', Letter)

    const User = require(path.join(config.root, 'models', `user.js`));
    setParamHandler(router, 'user', User)
};
