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

/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Deposit money into a wallet
 *     tags: [Transactions]
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
 *               - amount
 *             properties:
 *               wallet_id:
 *                 type: integer
 *                 description: ID of the wallet to deposit into
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 description: Amount to deposit
 *     responses:
 *       201:
 *         description: Deposit successful
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
 *                       example: Deposit successful
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
router.post('/deposit', deposit);

/**
 * @swagger
 * /api/transactions/withdraw:
 *   post:
 *     summary: Withdraw money from a wallet
 *     tags: [Transactions]
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
 *               - amount
 *             properties:
 *               wallet_id:
 *                 type: integer
 *                 description: ID of the wallet to withdraw from
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 description: Amount to withdraw
 *     responses:
 *       201:
 *         description: Withdrawal successful
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
 *                       example: Withdrawal successful
 *       400:
 *         description: Bad request - validation error or insufficient funds
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
router.post('/withdraw', withdraw);

/**
 * @swagger
 * /api/transactions/payment:
 *   post:
 *     summary: Pay for a product using wallet balance
 *     tags: [Transactions]
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
 *               - amount
 *             properties:
 *               wallet_id:
 *                 type: integer
 *                 description: ID of the wallet to pay from
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 description: Payment amount
 *     responses:
 *       201:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Payment successful
 *       400:
 *         description: Bad request - validation error or insufficient funds
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
router.post('/payment', payForProduct);

/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Transfer money between wallets
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from_wallet_id
 *               - to_wallet_id
 *               - amount
 *             properties:
 *               from_wallet_id:
 *                 type: integer
 *                 description: ID of the source wallet
 *               to_wallet_id:
 *                 type: integer
 *                 description: ID of the destination wallet
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 description: Amount to transfer
 *     responses:
 *       201:
 *         description: Transfer successful
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
 *                       example: Transfer successful
 *       400:
 *         description: Bad request - validation error or insufficient funds
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
router.post('/transfer', transfer);

export default router;
