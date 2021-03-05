"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFavoriteElement = exports.filterCats = exports.getAllCats = void 0;
const User_1 = __importDefault(require("../models/User"));
const Cat_1 = __importDefault(require("../models/Cat"));
const getAllCats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    let cats = yield Cat_1.default.find({}).skip(from).limit(limit).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });
    if (!cats) {
        return res.status(400).json({
            ok: false,
            cats: 'There are no cats in DB'
        });
    }
    ;
    return res.status(201).json({
        ok: true,
        cats
    });
});
exports.getAllCats = getAllCats;
const filterCats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    const category_id = Number(req.query.category_id);
    let cats = yield Cat_1.default.find({ category_id: category_id }).skip(from).limit(limit).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });
    if (!cats) {
        return res.status(400).json({
            ok: false,
            cats: 'There are no cats in DB'
        });
    }
    ;
    return res.status(201).json({
        ok: true,
        cats
    });
});
exports.filterCats = filterCats;
const AddFavoriteElement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield Cat_1.default.findOne({ img_url: String(req.query.img_url) }).catch((err) => {
        return res.json({
            ok: false,
            err
        });
    });
    if (!cat)
        return res.json({ ok: false, msg: 'Cat image not found in DB' });
    const user = yield User_1.default.findOne({ token: String(req.query.token) }).catch((err) => {
        return res.json({
            ok: false,
            err
        });
    });
    if (!user)
        return res.json({ ok: false, err: 'User not find in DB' });
    if (!user.fav_img) {
        user.fav_img = [req.query.img_url];
    }
    else {
        if (user.fav_img.length >= 10) {
            res.json({
                ok: false,
                msg: 'Favorite image storage full. Delete some image to insert another.'
            });
        }
        ;
        user.fav_img = [...user.fav_img, req.query.img_url];
    }
    ;
    user.save((err, updatedUser) => {
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
exports.AddFavoriteElement = AddFavoriteElement;
