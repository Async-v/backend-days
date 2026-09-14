import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
    } catch (error) {
        console.warn("Error Connecting to the Database", error)
    }
} 

export default connectDB;