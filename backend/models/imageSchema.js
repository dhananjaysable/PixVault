import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Image = mongoose.model('Image', imageSchema);

