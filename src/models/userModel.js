'use strict';

var mongoose = require('mongoose');

var usermodel = function () {
    var Schema = mongoose.Schema({
        username: {type: String},
        address: {type: String},
        password: {type: String},
        email: {type: String},
        created_on: {type: Date, default: Date.now},
        modified_on: {type: Date, default: Date.now}
    });
    Schema.pre('update', function () {
        this.update({}, {$set: {modified_on: new Date()}});
    });
    return mongoose.model('user', Schema);

};

module.exports = new usermodel();
