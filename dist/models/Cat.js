"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatSchema = void 0;
const mongoose_1 = require("mongoose");
var category;
(function (category) {
    category[category["hats"] = 1] = "hats";
    category[category["space"] = 2] = "space";
    category[category["funny"] = 3] = "funny";
    category[category["sunglasses"] = 4] = "sunglasses";
    category[category["boxes"] = 5] = "boxes";
    category[category["caturday"] = 6] = "caturday";
    category[category["ties"] = 7] = "ties";
    category[category["dream"] = 9] = "dream";
    category[category["kittens"] = 10] = "kittens";
    category[category["sinks"] = 14] = "sinks";
    category[category["clothes"] = 15] = "clothes";
})(category || (category = {}));
;
;
exports.CatSchema = new mongoose_1.Schema({
    category_id: Number,
    id_name: String,
    width: Number,
    height: Number,
    img_url: Array,
});
const Cat = mongoose_1.model('Cat', exports.CatSchema);
exports.default = Cat;
