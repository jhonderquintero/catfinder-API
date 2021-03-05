"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateErrors = void 0;
const express_validator_1 = require("express-validator");
const validateErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) { // if errors, then error 400
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    ;
    next();
};
exports.validateErrors = validateErrors;
