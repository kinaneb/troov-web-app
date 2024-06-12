import mongoose from 'mongoose';
//import dotenv from 'dotenv';


const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/troovdatabase';

async function connectDB() {
    try {
      await mongoose.connect(mongoURI);
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
}

export default connectDB;