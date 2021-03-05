const uniqueValidator = require('mongoose-unique-validator');
import mongoose, {Schema, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface UserInterface extends mongoose.Document{
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    googleId: string;
    token: string;
    fav_img: object[];
    online: boolean;
};

export const UserSchema: Schema = new Schema({
    givenName: String,
    familyName: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: [ isEmail, 'invalid email' ],
        trim: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false,
    },
    token: String,
    fav_img: Object,
    online: Boolean
});

UserSchema.plugin(uniqueValidator, {message: 'expected {PATH} to be unique'});

UserSchema.methods.toJSON = function()  {
    let userObject: any = this.toObject();
    delete userObject.password;
    return userObject
};

const User =  model<UserInterface>('User', UserSchema);
export default User;