'use strict';

module.exports = function*(next) {
    this.body = {salt: this.salt};
    yield * next;
}
