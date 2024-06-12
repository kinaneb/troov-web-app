import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

// TODO: adding email, role, refreshToken, etc.