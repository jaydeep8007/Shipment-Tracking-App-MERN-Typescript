import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/db';
import shipmentRoutes from './routes/shipmentRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', shipmentRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Shipment Tracking App check');
});

export default app;
