import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRouter from './routes/authRoute.js'
import imageRouter from './routes/imageRoute.js'
import contactRouter from './routes/contactRoute.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://pix-vault.netlify.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/upload', imageRouter);
app.use('/api/contact', contactRouter)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})
