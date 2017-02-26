'use strict';

const path = require('path');
const config = require('config');


// Get All Objects in Collection
exports.all = function(model) {
    return function*() {
        const Model = require(path.join(config.root, 'models', `${model}.js`));
        this.body = yield Model.find({});
    };
};


// Get Object by Id
exports.oneById = function(model) {
    return function*() {
        this.body = yield this.objById.toObject();
    };
};
