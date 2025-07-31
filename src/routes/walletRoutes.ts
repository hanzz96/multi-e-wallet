import { Router } from 'express';
import { createWallet, listWallets, getTotalWalletBalance, getWalletById } from '../controller/walletController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Semua endpoint ini butuh autentikasi
router.use(protect);

/**
 * @swagger
 * /api/wallets:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - currency
 *             properties:
 *               name:
 *                 type: string
 *                 description: Wallet name
 *               currency:
 *                 type: string
 *                 description: Currency code (USD, EUR, etc.)
 *     responses:
 *       201:
 *         description: Wallet created successfully
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
 *                       example: Wallet created successfully
 *                     wallet:
 *                      $ref: '#/components/schemas/Wallet'
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
 */
router.post('/', createWallet);

/**
 * @swagger
 * /api/wallets:
 *   get:
 *     summary: Get all wallets for the authenticated user
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: wallet2
 *                   balances:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         currency:
 *                           type: string
 *                           example: JPY
 *                         amount:
 *                           type: string
 *                           example: "1000.00"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', listWallets);

/**
 * @swagger
 * /api/wallets/{id}:
 *   get:
 *     summary: Get a specific wallet by ID
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Wallet ID
 *     responses:
 *       200:
 *         description: Wallet retrieved successfully
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
 *                       example: "Wallet fetched successfully"
 *                     wallet:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         user_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "wallet2"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-07-31T08:53:27.871Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-07-31T08:53:27.871Z"
 *                         WalletBalances:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 2
 *                               wallet_id:
 *                                 type: integer
 *                                 example: 1
 *                               currency_code:
 *                                 type: string
 *                                 example: "JPY"
 *                               amount:
 *                                 type: string
 *                                 example: "1000.00"
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2025-07-31T09:32:19.384Z"
 *                               updatedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2025-07-31T09:32:19.384Z"
 *       404:
 *         description: Wallet not found
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
 */
router.get('/:id', getWalletById);

/**
 * @swagger
 * /api/wallets/{id}/total-balance:
 *   get:
 *     summary: Get total balance for a specific wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Wallet ID
 *       - in: query
 *         name: currency
 *         required: false
 *         schema:
 *           type: string
 *         description: Currency code (USD, EUR, etc.)
 *     responses:
 *       200:
 *         description: Total balance retrieved successfully
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
 *                     wallet_id:
 *                       type: integer
 *                     total_balance:
 *                       type: number
 *                       format: decimal
 *                     currency:
 *                       type: string
 *       404:
 *         description: Wallet not found
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
 */
router.get('/:id/total-balance', getTotalWalletBalance);

export default router;
