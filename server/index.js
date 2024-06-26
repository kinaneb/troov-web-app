// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import auth from './routers/auth.js';
import signaledObjectRouter from './routers/signaledObject.js';
import logger from './middlewares/logger.js';
import cors from 'cors';

dotenv.config(); 

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001', // the frontend URL
  credentials: true,
}));


app.use(logger);

app.use('', auth);

app.use('/api/objects', signaledObjectRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully ...');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // to avoid listening to the port before the connection is established
});
