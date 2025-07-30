import { Router } from 'express';
import { createWallet, getWalletBalances, getWalletTotalBalance } from '../controller/walletController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Semua endpoint ini butuh autentikasi
router.use(protect);

// POST /api/wallets
router.post('/', createWallet);

// GET /api/wallets/:id/balances
router.get('/:id/balances', getWalletBalances);

// GET /api/wallets/:id/total?currency=USD
router.get('/:id/total', getWalletTotalBalance);

export default router;
