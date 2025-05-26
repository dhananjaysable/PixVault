import { Contact } from "../models/contactModel.js";

export const contactMe = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const newContact = new Contact({
            name,
            email,
            message
        })
        const contact = await newContact.save();
        if (!contact) {
            return res.status(400).json({
                success: false,
                message: "Failed to create contact!"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Message Sent Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}