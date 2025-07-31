import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import { connectDB } from './src/config/db';
import { globalErrorHandler } from './src/middlewares/errorHandler';
import walletRoutes from './src/routes/walletRoutes';
import walletBalanceRoutes from './src/routes/walletBalanceRoutes';
import transactionRoutes from './src/routes/transactionRoutes';
import redis from './src/lib/redis';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// DB Connection
connectDB();

// Ping redis
(async () => {
    try {
      const pong = await redis.ping();
      console.log(`[Redis] PING: ${pong}`);
    } catch (error) {
      console.error('[Redis] Unable to connect to Redis:', error);
      process.exit(1); // Optional: crash app if Redis is critical
    }
  })();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/wallet-balances', walletBalanceRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));