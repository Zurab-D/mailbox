'use strict';

const post = require('./post.js');

module.exports = function*() {
    let { body: data } = this.request.body;

    if (!data) {
        data = this.request.body;
    };

    // if string, parse it
    if (typeof(data) === 'string') {
        data = JSON.parse(data);
    }

    if (data) {
        if (data['users']) {
            yield post('user');
            this.body = 'Ok';
        };

        if (data['letters']) {
            yield post('letter');
            this.body = 'Ok';
        };

        if (data['mailboxes']) {
            yield post('mailbox');
            this.body = 'Ok';
        };
    };
};
