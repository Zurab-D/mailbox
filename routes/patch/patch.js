'use strict';

const path = require('path');
const config = require('config');
const mongoose = require('mongoose');


//
module.exports = function(model) {
    return function(router) {
        return function*(next) {
            const Model = require(path.join(config.root, 'models', `${model}.js`));

            let data = this.request.body;

            if (data instanceof Object) {
                delete data['_id'];

                if (!mongoose.Types.ObjectId.isValid(this.params[model])) {
                    this.throw(404);
                };

                /*this.objById = yield*/ Model.findByIdAndUpdate( this.params[model], data, () => {} );

                /*if (!this.objById) {
                    this.throw(404);
                };*/
            };

            this.body = 'Ok';

            yield next;
        };
    };
};
