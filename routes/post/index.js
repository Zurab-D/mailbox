// const AddMailboxes = require('./post-mailbox');
// const AddLetters = require('./post-letter');
// const AddUsers = require('./post-user');

// exports.AddMailboxes = AddMailboxes;
// exports.AddLetters = AddLetters;
// exports.AddUsers = AddUsers;

exports.AddMailboxes = require('./post')('mailbox');
exports.AddLetters = require('./post')('letter');
exports.AddUsers = require('./post')('user');

exports.addAnyDbObjects = require('./post-any');
