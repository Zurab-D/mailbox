'use strict';

const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

mongoose.set('debug', config.debug);

mongoose.connect(config.mongoose.uri + config.dbName, config.mongoose.options);

module.exports = mongoose;
