'use strict';

function routesGuard(allowedUrlsArray) {
    return function* (next) {
        const url = decodeURI( require('url').parse(this.request.url).pathname ).toLowerCase();

        const urlAllowed = allowedUrlsArray.map(item => item.toLowerCase())
                                           .some(item => url === item);

        // check if user is authenticated or url is allowed
        if (urlAllowed || this.isAuthenticated()) {
            yield * next;
        } else {
            this.throw(403);
        }
    }
}

module.exports = routesGuard([
    '/signin',
    '/signup',
    '/authorized'
]);
