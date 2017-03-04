'use strict';

module.exports = {
    host: 'localhost',
    port: 3000,
    root: process.cwd(),
    dbName: 'mailbox',
    mongoose: {
        uri: 'mongodb://localhost/',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                },
                poolSize: 5
            },
        },
    },
    secret: 'blah-blah-blah',
    crypto: {
        hash: {
            length: 128,
            // may be slow(!): iterations = 12000 take ~60ms to generate strong password
            iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
      }
    },
};
