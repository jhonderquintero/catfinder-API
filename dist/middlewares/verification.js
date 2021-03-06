"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
let tokenVerification = (req, res, next) => {
    let token = req.get('Authorization');
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        ;
        req.user = decoded.user;
        next();
    });
};
exports.default = tokenVerification;
