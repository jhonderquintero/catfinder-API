const uniqueValidator = require('mongoose-unique-validator');
import mongoose, {Schema, model} from 'mongoose';

// Random img https://api.thecatapi.com/v1/images/search?category_ids=ID_CATEGORY

enum category {
    hats = 1, 
    space = 2,
    funny = 3,
    sunglasses = 4,
    boxes = 5,
    caturday = 6,
    ties = 7,
    dream = 9,
    kittens = 10,
    sinks = 14,
    clothes = 15,
};

export interface CatInterface extends mongoose.Document{
    category_id: category,
    id_name: string,
    width: number,
    height: number,
    img_url: string
};

export const CatSchema: Schema = new Schema({
    category_id: Number,
    id_name: String,
    width: Number,
    height: Number,
    img_url: String
});

const Cat =  model<CatInterface>('Cat', CatSchema);
export default Cat;