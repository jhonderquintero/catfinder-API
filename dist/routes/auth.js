"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    User Routes / Authorizations
    Host + /api/auth

    CAT API KEY:
    91960c26-0727-471d-92ed-ba210e268b4f

    MONGO ATLAS:
    DB_USER: catfinder_user
    PASS: P3wTUjkqPafO7qFJ

    OAuth GOOGLE:
    Client ID = 890895167918-o17h2hmpatre78rjjd11o0rocf67pk53.apps.googleusercontent.com
    Client Secret = U17z_55tbQwdNOPHohhBFRm0
*/
const auth_1 = require("../controllers/auth");
const validateErrors_1 = require("../middlewares/validateErrors");
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const router = express_1.Router();
// {url}/api/auth (body.email, body.password)
router.post('/', [
    express_validator_1.check('email', 'Email is necessary').isEmail().not().isEmpty(),
    express_validator_1.check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    validateErrors_1.validateErrors
], auth_1.userLogin);
// {url}/api/auth/new (body.givenName, body.familyName, body.email, body.password);
router.post('/google/login', [
    express_validator_1.check('givenName', 'Name is necessary').not().isEmpty(),
    express_validator_1.check('familyName', 'Family name is necessary').not().isEmpty(),
    express_validator_1.check('email', 'Email is necessary').isEmail(),
    express_validator_1.check('password', 'Password is necessary').not().isEmpty(),
    express_validator_1.check('googleId', 'Google ID is necessary').not().isEmpty(),
    validateErrors_1.validateErrors
], auth_1.newUser);
router.post('/register', [
    express_validator_1.check('givenName', 'Name is necessary').not().isEmpty(),
    express_validator_1.check('familyName', 'Family name is necessary').not().isEmpty(),
    express_validator_1.check('email', 'Email is necessary').isEmail(),
    express_validator_1.check('password', 'Password is necessary').not().isEmpty(),
    validateErrors_1.validateErrors
], auth_1.userRegistration);
router.put('/logout', [
    express_validator_1.check('token', 'Token is necessary').not().isEmpty(),
    validateErrors_1.validateErrors
], auth_1.userLogout);
module.exports = router;
