'use strict';

module.exports = function*(next) {
    this.logout();
    this.body = 'Ok';
}
