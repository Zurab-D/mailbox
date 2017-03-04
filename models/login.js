const mongoose = require('mongoose');
// const _ = require('lodash');
const hash = require('../libs/hash');
const uniqueValidator = require('mongoose-unique-validator');

const loginSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: 'Имя пользователя отсутствует.',
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: 'Логин пользователя не должен быть пустым.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'E-mail пользователя не должен быть пустым.',
        lowercase: true,
        trim: true,
        validate: [{
            validator: value => {
                return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
            },
            msg: 'Укажите, пожалуйста, корректный email.'
        }]
    },
    provider: String,
    passwordHash: {
        type: String,
        // required: true
    },
    salt: {
        // required: true,
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


loginSchema
    .virtual('password')
    .set(function(password) {
        if (!password) this.invalidate('password', 'Пароль должен быть указан.');
        if (password.length < 4) {
            this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
        }

        this._plainPassword = password;

        this.salt = hash.createSalt();
        this.passwordHash = hash.createHashSlow(password, this.salt);
    })
    .get(function() {
        return this._plainPassword;
    });


loginSchema.methods.checkPassword = function(password) {
    if (!password) return false; // empty password means no login by password
    if (!this.passwordHash) return false; // this login does not have password (the line below would hang!)

    return hash.createHashSlow(password, this.salt) == this.passwordHash;
};


loginSchema.plugin(uniqueValidator, {
  message: 'Пользователь с таким {PATH} уже зарегистрирован.' }
);


module.exports = mongoose.model('Login', loginSchema);
