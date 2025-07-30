import express from 'express';
import { register, login, getProfile } from '../controller/authController';
import { protect } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getProfile);

export default router;