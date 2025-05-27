import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists!"
            })
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Credentials required!"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }
        const compareHash = bcrypt.compareSync(password, user.password);
        if (!compareHash) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })


        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
            domain: process.env.NODE_ENV === "production" ? undefined : "localhost"
        };


        return res.cookie("token", token, cookieOptions).json({
            success: true,
            message: "User logged in successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: process.env.NODE_ENV === "production" ? undefined : "localhost"
        };
        return res.clearCookie('token', cookieOptions).json({
            success: true,
            message: "User logged out successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.user.userId;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "userId is required!"
            })
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}