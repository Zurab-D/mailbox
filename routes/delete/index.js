'use strict';

const del = require('./delete');

exports.deleteAllMailboxes = del.all('mailbox');
exports.deleteAllLetters = del.all('letter');
exports.deleteAllUsers = del.all('user');

exports.deleteMailbox = del.oneById('mailbox');
exports.deleteLetter = del.oneById('letter');
exports.deleteUser = del.oneById('user');
