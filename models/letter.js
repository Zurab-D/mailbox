'use strict';

const config = require('config');
const path = require('path');
const mongoose = require(path.join(config.root, 'db'));


/*
Модель letter:
    String  mailbox*    -- п/я
    String  subject     -- subject
    String  body        -- текст письма
    String  to*         -- адресат письма

    mailbox, subject, body, to
*/

let letterSchema = new mongoose.Schema({
    mailbox: {
        type: String,
        required: 'Mailbox mustn\'t be empty.',
    },
    subject: String,
    body: String,
    to: {
        type: String,
        required: 'Email (field "to") mustn\'t be empty.',
    },
});


let Letter = mongoose.model('Letter', letterSchema);


module.exports = Letter;
