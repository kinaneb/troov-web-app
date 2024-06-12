import mongoose from 'mongoose';
import hashPassword from '../utils/auth';

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

const User = mongoose.model('User', userSchema);

// TODO: adding email, role, refreshToken, etc.