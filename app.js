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
const router = new Router();


const app = koa();


// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];


// -- Middlewares ----------
require('./middlewares')(app);


// -- Router ----------
require('./routes')(app, router);


// -- Export ----------
module.exports = app;
