'use strict';

const path = require('path');
const config = require('config');

module.exports = function(model) {
    return function*(next) {
        const Model = require(path.join(config.root, 'models', `${model}.js`));

        let data = this.request.body;

        // if string, parse it
        if (typeof(data) === 'string') {
            data = JSON.parse(data);
        }

        // if we got object like this: {model:[{...}, {...}]}, take out model array
        if (data instanceof Object) {
            if (data[model]) {
                data = data[model];
            } else if (data[`${model}s`]) {
                data = data[`${model}s`];
            } else if (data[`${model}es`]) {
                data = data[`${model}es`];
            } else {
                // this.throw(400, `Expected property "${model}" or "${model}s" or "${model}es" as array of model rows \n`);
            }
        };

        // if we got array of data, save that data
        if (data instanceof Array) {
            for (let i = 0; i < data.length; i++) {
                delete data[i]['_id'];
                yield (new Model(data[i])).save();
            }
        } else if (data instanceof Object) {
            // if we got a single mailbox object
            delete data['_id'];
            yield (new Model(data)).save();
        }

        this.body = 'Ok';
    };
};
