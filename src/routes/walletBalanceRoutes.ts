import express from 'express';
import { createWalletBalance } from '../controller/walletBalanceController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Semua endpoint ini butuh autentikasi
router.use(protect);
router.post('/', createWalletBalance);

export default router;
