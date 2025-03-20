
import mongoose from 'mongoose'
import { MONGO_URL } from '../utils/constants';



export const connectDB = async ():Promise<void>=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Mongodb Atlas Connected')
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}