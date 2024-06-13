import mongoose from 'mongoose';

const signaledObjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    signaledDate: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    signaledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    }
},  { timestamps: true });

const SignaledObject = mongoose.model('SignaledObject', signaledObjectSchema);

export default SignaledObject;