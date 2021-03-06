"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cat_1 = __importDefault(require("../models/Cat"));
const axios_1 = __importDefault(require("axios"));
const databaseCreation = () => {
    axios_1.default({
        method: 'GET',
        url: 'https://api.thecatapi.com/v1/categories'
    }).then(res => {
        for (let index = 0; index < res.data.length; index++) {
            let { id } = res.data[index];
            console.log(id);
            getData(id, 100); //OBTAIN 100 elements from each category
        }
    }).catch(err => console.log(err));
};
const getData = (id, limit) => {
    axios_1.default({
        method: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search',
        params: {
            limit,
            category_ids: id
        }
    }).then((response) => {
        for (let index = 0; index < response.data.length; index++) {
            let { categories, url: img_url, width, height } = response.data[index];
            let { id: category_id, name: id_name } = categories[0];
            console.log(img_url, id_name);
            insertDocument(category_id, id_name, width, height, img_url);
        }
    }).catch(err => console.log(err));
};
const insertDocument = (category_id, id_name, width, height, img_url) => {
    let newCat = new Cat_1.default({
        category_id,
        id_name,
        width,
        height,
        img_url
    });
    newCat.save((err, newUserDB) => {
        if (err)
            console.log(err);
        console.log(newUserDB);
    });
};
exports.default = databaseCreation;
