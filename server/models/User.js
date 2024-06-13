import mongoose from 'mongoose';
import { hashPassword } from '../utils/hashPassword.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) { 
        user.password = await hashPassword(user.password);
    }
    next();
}); // this is a middleware that will run before saving a document


// specify the transform userSchema option to remove the password when converting the document into Object
if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function(doc, ret, options) {
    delete ret.password;
    return ret;
}

// specify the transform userSchema option to remove the password when converting the document into JSON
if (!userSchema.options.toJSON) userSchema.options.toJSON = {};
userSchema.options.toJSON.transform = function(doc, ret, options) {
    delete ret.password;
    return ret;
}

const User = mongoose.model('User', userSchema);



export default User;

// TODO: adding email, role, refreshToken, etc.