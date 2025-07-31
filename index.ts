import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './src/routes/authRoutes';
import { connectDB } from './src/config/db';
import { globalErrorHandler } from './src/middlewares/errorHandler';
import { apiDocsMiddleware, apiUsageLogger } from './src/middlewares/apiDocsMiddleware';
import walletRoutes from './src/routes/walletRoutes';
import walletBalanceRoutes from './src/routes/walletBalanceRoutes';
import transactionRoutes from './src/routes/transactionRoutes';
import redis from './src/lib/redis';
import { specs } from './src/config/swagger';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(apiDocsMiddleware);
app.use(apiUsageLogger);

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
// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'E-Wallet API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/wallet-balances', walletBalanceRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));