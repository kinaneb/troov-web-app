// index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/mydatabase';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully ...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();


const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
