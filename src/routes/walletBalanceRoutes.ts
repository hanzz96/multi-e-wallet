import express from 'express';
import { createWalletBalance } from '../controller/walletBalanceController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Semua endpoint ini butuh autentikasi
router.use(protect);

/**
 * @swagger
 * /api/wallet-balances:
 *   post:
 *     summary: Create a new wallet balance
 *     tags: [Wallet Balances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wallet_id
 *               - balance
 *               - currency
 *             properties:
 *               wallet_id:
 *                 type: integer
 *                 description: ID of the wallet
 *               balance:
 *                 type: number
 *                 format: decimal
 *                 description: Initial balance amount
 *               currency:
 *                 type: string
 *                 description: Currency code (USD, EUR, etc.)
 *     responses:
 *       201:
 *         description: Wallet balance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Wallet balance created successfully
 *                     data:
 *                       $ref: '#/components/schemas/WalletBalance'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Wallet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createWalletBalance);

export default router;
