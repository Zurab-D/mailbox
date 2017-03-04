'use strict';

const config = require('config');
const path = require('path');
const mongoose = require(path.join(config.root, 'db'));
const uniqueValidator = require('mongoose-unique-validator');


/*
Модель mailbox (скорее это папка): Inbox, Sent, Trash, Spam...
    String title* -- название
*/


let mailboxSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Mailbox title mustn\'t be empty.',
        unique: true,
    },
});


mailboxSchema.plugin(uniqueValidator, {
    message: 'Mailbox with the same Title already exists.'
});


let Mailbox = mongoose.model('Mailbox', mailboxSchema);


module.exports = Mailbox;
