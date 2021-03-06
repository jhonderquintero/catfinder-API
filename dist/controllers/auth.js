"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistration = exports.userLogout = exports.newUser = exports.userLogin = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userLogin = (req, res) => {
    const { email, password } = req.body;
    User_1.default.findOne({ email }, (err, userFind) => {
        if (err)
            return res.status(500).json({
                err
            });
        if (!userFind) {
            return res.status(404).json({
                err: {
                    message: 'User or password incorrect, please try again'
                }
            });
        }
        ;
        if (!bcrypt_1.default.compareSync(password, userFind.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'User or password incorrect, please try again'
                }
            });
        }
        ;
        let token = jsonwebtoken_1.default.sign({
            user: userFind
        }, String(process.env.JWT_SECRET), { expiresIn: process.env.TOKEN_TIME });
        userFind.online = true;
        userFind.token = token;
        userFind.save((err, updatedUser) => {
            if (err)
                return res.status(500).json({ ok: false, err });
            else {
                return res.json({
                    ok: true,
                    user: updatedUser
                });
            }
            ;
        });
    });
};
exports.userLogin = userLogin;
const newUser = (req, res) => {
    let body = req.body;
    let user = new User_1.default({
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        email: body.email,
        googleId: req.body.googleId,
        online: true,
    });
    user.save((err, newUser) => {
        if (err) {
            return res.status(500).json({ ok: false, msg: 'Error saving in DB', err });
        }
        else {
            return res.status(201).json({
                ok: true,
                user: newUser
            });
        }
        ;
    });
};
exports.newUser = newUser;
const userRegistration = (req, res) => {
    const { givenName, familyName, email, password } = req.body;
    const saltRounds = 10;
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        if (err)
            return res.status(400).json({ ok: false, err });
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err)
                return res.status(400).json({ ok: false, err });
            let newUser = new User_1.default({
                givenName,
                familyName,
                email,
                password: hash,
            });
            newUser.save((err, newUserDB) => {
                if (err)
                    return res.status(500).json({ ok: false, err });
                res.status(201).json({
                    ok: true,
                    msg: 'New user created',
                    user: newUserDB
                });
            });
        });
    });
};
exports.userRegistration = userRegistration;
const userLogout = (req, res) => {
    let { token } = req.body;
    if (!token) {
        return res.status(404).json({
            ok: false,
            token: 'Not Found'
        });
    }
    ;
    User_1.default.findOne({ token }, (err, userFind) => {
        if (err)
            return res.status(400).json({ ok: false, err });
        if (!userFind)
            return res.status(404).json({ ok: false, err: 'Not Found' });
        userFind.token = 'null';
        userFind.online = false;
        userFind.save((err, updatedUser) => {
            if (err)
                return res.status(500).json(err);
            else {
                return res.json({
                    ok: true,
                    user: updatedUser
                });
            }
            ;
        });
    });
};
exports.userLogout = userLogout;
