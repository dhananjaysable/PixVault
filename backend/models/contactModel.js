import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
            maxlength: 100,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            minlength: 5,
            maxlength: 1000,
        },
    },
    { timestamps: true }
);

export const Contact =
    mongoose.models.Contact || mongoose.model("Contact", contactSchema);