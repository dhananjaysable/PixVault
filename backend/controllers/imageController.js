import { Image } from '../models/imageSchema.js';
import { uploadFile, deleteImage } from "../middlewares/claudinary.js";

export const uploadImage = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const uploadedBy = req.user.userId;
        const file = req.file;
        if (!title || !description || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        if (!uploadedBy) {
            return res.status(400).json({
                success: false,
                message: "UploadedBy is missing!"
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const result = await uploadFile(file.path, "images");
        if (!result || !result.secure_url || !result.public_id) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to Cloudinary"
            });
        }

        const newImage = new Image({
            uploadedBy,
            title,
            imageUrl: result.secure_url,
            publicId: result.public_id,
            description,
            tags
        })
        await newImage.save()
        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully.",
            data: newImage
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
    }
}

export const getAllImages = async (req, res) => {
    try {
        const uploadedBy = req.user.userId;
        if (!uploadedBy) {
            return res.status(401).json({
                success: false,
                message: "Please login again!"
            })
        }
        const images = await Image.find({ uploadedBy: uploadedBy })
        if (!images) {
            return res.status(404).json({
                success: false,
                message: "Images not found!"
            })
        }
        return res.status(200).json({
            success: true,
            images
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Get all image failed!', error: error.message });
    }
}

export const getOneImage = async (req, res) => {
    try {
        const uploadedBy = req.user.userId;
        const { id } = req.params;
        if (!uploadedBy || !id) {
            return res.status(401).json({
                success: false,
                message: "Please login again!"
            })
        }
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found!"
            })
        }
        return res.status(200).json({
            success: true,
            image
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'getOneImage failed!', error: error.message });
    }
}

export const deleteOneImage = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id or expired id!"
            });
        }
        const image = await Image.findByIdAndDelete(id);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found!"
            });
        }
        const result = await deleteImage(image.publicId);
        if (result.result !== "ok") {
            return res.status(400).json({
                success: false,
                message: "Failed to delete Image from Cloudinary!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Image deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'deleteImage failed!', error: error.message });
    }
}