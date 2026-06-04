import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/JWT-Auth");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};