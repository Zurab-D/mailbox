'use strict';

const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

function setIdParamHandler(router, paramName, Model) {
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
    const Mailbox = require(path.join(config.root, 'models', 'mailbox.js'));
    setIdParamHandler(router, 'mailbox', Mailbox)

    const Letter = require(path.join(config.root, 'models', 'letter.js'));
    setIdParamHandler(router, 'letter', Letter)

    const User = require(path.join(config.root, 'models', 'user.js'));
    setIdParamHandler(router, 'user', User)

    const Login = require(path.join(config.root, 'models', 'login.js'));
    router.param('saltuser', function*(name, next) {
       this.objById = yield Login.findOne({'username': name})
                                 .select('salt')
                                 .exec((err, doc) => {
                                    if (err) { this.throw(404); };
                                    this.salt = doc.salt;
                                 });

       if (!this.salt) {
           this.throw(404);
       };

       yield * next;
    });
};
