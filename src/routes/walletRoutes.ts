import { Router } from 'express';
import { createWallet, listWallets, getTotalWalletBalance, getWalletById } from '../controller/walletController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Semua endpoint ini butuh autentikasi
router.use(protect);

// POST /api/wallets
router.post('/', createWallet);
router.get('/', listWallets);
router.get('/:id', getWalletById);
router.get('/:id/total-balance', getTotalWalletBalance);

export default router;
