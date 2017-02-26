'use strict';

const config = require('config');
const path = require('path');
const mongoose = require(path.join(config.root, 'db'));
const uniqueValidator = require('mongoose-unique-validator');


/*
Модкль user:
    String  fullName*   -- имя
    String  email*      -- email
    String  avatarUrl   -- URL аватара
    Date    birthdate   -- дата рождения
    String  gender      -- пол: 'M' или 'F'
    String  address     -- адрес

    fullName, email, avatarUrl, birthdate, gender, address
*/

let userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Username mustn\'t be empty.',
    },
    email: {
        type: String,
        required: 'Email must be filled',
        unique: true,
    },
    avatarUrl: String,
    birthdate: Date,
    gender: {
        type: String,
        uppercase: true,
        enum: ['M', 'F']
    },
    address: String,
});


userSchema.plugin(uniqueValidator, {
    message: 'User with the specified email already exists' }
);


let User = mongoose.model('User', userSchema);


module.exports = User;
