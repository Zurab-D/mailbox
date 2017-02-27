'use strict';

const path = require('path');
const config = require('config');


exports.all = function(model) {
    return function*(next) {
        const Model = require(path.join(config.root, 'models', `${model}.js`));

        yield Model.remove({});

        this.body = 'Ok';

        yield * next;
    };
};


exports.oneById = function(model) {
    return function*(next) {
        const Model = require(path.join(config.root, 'models', `${model}.js`));

        yield this.objById.remove();

        this.body = 'Ok';

        yield * next;
    };
};
