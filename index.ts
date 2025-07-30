import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import { connectDB } from './src/config/db';
import { globalErrorHandler } from './src/middlewares/errorHandler';
import walletRoutes from './src/routes/walletRoutes';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);

// Error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));