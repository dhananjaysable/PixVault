import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo db.");
    } catch (error) {
        console.log(`Error while connecting to db : ${error}`);
    }
}