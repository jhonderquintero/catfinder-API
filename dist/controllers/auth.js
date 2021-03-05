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
            return res.status(400).json({
                err: {
                    message: 'User or password incorrect, please try again'
                }
            });
        }
        ;
        if (!bcrypt_1.default.compareSync(password, userFind.password)) {
            return res.status(400).json({
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
                res.status(400).json(err);
            else {
                res.json({
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
    const { givenName, lastName, email, password, googleId, online } = req.body;
    const saltRounds = 10;
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        if (err)
            res.status(400).send(err);
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err)
                res.status(400).send(err);
            let newUser = new User_1.default({
                givenName,
                lastName,
                email,
                googleId,
                password: hash,
                online
            });
            newUser.save((err, newUserDB) => {
                if (err)
                    res.status(400).send(err);
                res.status(201).json({
                    ok: true,
                    msg: 'new user created',
                    user: newUserDB
                });
            });
        });
    });
};
exports.newUser = newUser;
const userRegistration = (req, res) => {
    let body = req.body;
    let user = new User_1.default({
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        email: body.email,
        password: bcrypt_1.default.hashSync(body.password, 10),
        online: true,
    });
    user.save((err, newUser) => {
        if (err)
            res.status(400).json(err);
        else {
            res.json({
                ok: true,
                user: newUser
            });
        }
        ;
    });
};
exports.userRegistration = userRegistration;
const userLogout = (req, res) => {
    let { token } = req.body;
    if (!token) {
        res.status(400).json({
            ok: false,
            token: 'Invalid Token'
        });
    }
    ;
    User_1.default.findOne({ token }, (err, userFind) => {
        if (err)
            return res.status(400).json({ ok: false, err });
        if (!userFind)
            return res.status(400).json({ ok: false, err: 'Invalid Token' });
        userFind.token = 'null';
        userFind.online = false;
        userFind.save((err, updatedUser) => {
            if (err)
                res.status(400).json(err);
            else {
                res.json({
                    ok: true,
                    user: updatedUser
                });
            }
            ;
        });
    });
};
exports.userLogout = userLogout;
