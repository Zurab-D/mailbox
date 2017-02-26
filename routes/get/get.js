'use strict';

const path = require('path');
const config = require('config');


// Get All Objects in Collection
exports.getAll = function(model) {
    return function*() {
        const Model = require(path.join(config.root, 'models', `${model}.js`));
        this.body = yield Model.find({});
    };
};


// Get Object by Id
exports.getById = function(model) {
    return function*() {
        this.body = yield this.objById.toObject();
    };
};
