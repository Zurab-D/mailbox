'use strict';

const patch = require('./patch');

exports.patchMailbox = patch('mailbox');
exports.patchLetter = patch('letter');
exports.patchUser = patch('user');
