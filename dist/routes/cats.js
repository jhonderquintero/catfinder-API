"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cats_1 = require("../controllers/cats");
const validateErrors_1 = require("../middlewares/validateErrors");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
// GET ALL from api/cats
router.get('/', cats_1.getAllCats);
// FILTER CATS from api/cats/category
router.get('/category', cats_1.filterCats);
// FAVORITE CATS from api/cats/favorite 
// Must have an active session to this
router.post('/favorite', [
    express_validator_1.check('token', 'Token is necessary').not().isEmpty(),
    express_validator_1.check('img_url', 'img_url is necessary').not().isEmpty(),
    validateErrors_1.validateErrors
], cats_1.AddFavoriteElement);
// Possible new future features
// router.delete('/favorite/delete', DeleteFavoriteElement in one user collection);
module.exports = router;
