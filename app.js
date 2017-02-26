'use strict';

// -- Long stack trace (+clarify from co) if needed ----------
if (process.env.TRACE) {
    require('./libs/trace');
}
console.log('== process.env.TRACE = ' + !!process.env.TRACE);


const koa = require('koa');
const config = require('config');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');


const app = koa();


// -- Middlewares ----------
require('./middlewares')(app);


// -- Router ----------
require('./routes')(app);


// -- Export ----------
module.exports = app;
