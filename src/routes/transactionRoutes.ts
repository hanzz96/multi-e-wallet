import { Router } from 'express';
import {
  deposit,
  withdraw,
  payForProduct,
  transfer
} from '../controller/transactionController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();
// Semua endpoint ini butuh autentikasi
router.use(protect);

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/payment', payForProduct);
router.post('/transfer', transfer); // <-- added

export default router;
