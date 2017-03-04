'use strict';

module.exports = function*(next) {
    if (this.isAuthenticated()) {
        const { _id, displayName, username } = this.req.user;
        this.body = { authorised: true, _id, displayName, username };
    } else {
        this.body = { authorised: false };
    };
};
