"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const uniqueValidator = require('mongoose-unique-validator');
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
;
exports.UserSchema = new mongoose_1.Schema({
    givenName: String,
    familyName: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: [isEmail_1.default, 'invalid email'],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: String,
    token: String,
    fav_img: Object,
    online: Boolean
});
exports.UserSchema.plugin(uniqueValidator, { message: 'expected {PATH} to be unique' });
exports.UserSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
const User = mongoose_1.model('User', exports.UserSchema);
exports.default = User;
