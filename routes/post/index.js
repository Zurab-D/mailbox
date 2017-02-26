const post = require('./post');

exports.AddMailboxes = post('mailbox');
exports.AddLetters = post('letter');
exports.AddUsers = post('user');

exports.addAnyDbObjects = require('./post-any');
