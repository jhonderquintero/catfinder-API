const uniqueValidator = require('mongoose-unique-validator');
import mongoose, {Schema, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface UserInterface extends mongoose.Document{
    name: string;
    email: string;
    password: string;
    googleId: string;
    online: boolean;
};

export const UserSchema: Schema = new Schema({
    name: String,
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
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        required: true,
    },
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