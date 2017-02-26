'use strict';

const get = require('./get');

exports.getAllMailboxes = get.all('mailbox');
exports.getAllLetters = get.all('letter');
exports.getAllUsers = get.all('user');

exports.getMailboxById = get.oneById('mailbox');
exports.getLetterById = get.oneById('letter');
exports.getUserById = get.oneById('user');
