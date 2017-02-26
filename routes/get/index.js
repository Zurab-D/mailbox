'use strict';

exports.getAllMailboxes = require('./get').getAll('mailbox');
exports.getAllLetters = require('./get').getAll('letter');
exports.getAllUsers = require('./get').getAll('user');

exports.getMailboxById = require('./get').getById('mailbox');
exports.getLetterById = require('./get').getById('letter');
exports.getUserById = require('./get').getById('user');
