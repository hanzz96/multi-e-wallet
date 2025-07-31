import { Request, Response, NextFunction } from 'express';
import { sequelize } from '../config/db';
import WalletBalance from '../models/WalletBalance';
import Transaction, { TransactionType } from '../models/Transaction';
import CurrencyRate from '../models/CurrencyRate';
import { AppError } from '../utils/appError';
import { responseMessage } from '../utils/response';
import Decimal from 'decimal.js';
import Wallet from '../models/Wallet';
import { acquireLock } from '../utils/redisLockManager';

const getLatestRate = async (from: string, to: string) => {
  if (from === to) return 1;
  const rate = await CurrencyRate.findOne({
    where: {
      currency_code: from,
      to_currency_code: to,
      end_date: null,
    },
    order: [['start_date', 'DESC']],
  });
  if (!rate) throw new AppError(`Currency rate from ${from} to ${to} not found`, 404);
  return Number(rate.to_currency_rate);
};

// Deposit
export const deposit = async (req: Request, res: Response, next: NextFunction) => {
    
  const { wallet_balance_id, amount } = req.body;
  const t = await sequelize.transaction();
  const lockKey = `lock:wallet-balance:${wallet_balance_id}`;
  try {
    const lock = await acquireLock(lockKey);
    const walletBalance = await WalletBalance.findByPk(wallet_balance_id, { transaction: t });
    if (!walletBalance) throw new AppError('Wallet balance not found', 404);
    
    walletBalance.amount = new Decimal(walletBalance.amount).plus(amount).toNumber();
    await walletBalance.save({ transaction: t });

    await Transaction.create({
      wallet_balance_id: wallet_balance_id,
      type: TransactionType.DEPOSIT,
      amount,
      rate_to: 1,
    }, { transaction: t });

    await t.commit();
    await lock.release();
    return res.status(201).json(responseMessage('Deposit successful'));
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Withdraw
export const withdraw = async (req: Request, res: Response, next: NextFunction) => {
  const { wallet_balance_id, amount } = req.body;

  const t = await sequelize.transaction();
  const lockKey = `lock:wallet-balance:${wallet_balance_id}`;
  try {
    const lock = await acquireLock(lockKey);
    const walletBalance = await WalletBalance.findByPk(wallet_balance_id, { transaction: t });

    if (!walletBalance) throw new AppError('Wallet balance not found', 404);
    if (walletBalance.amount < amount) throw new AppError('Insufficient funds', 400);

    walletBalance.amount = new Decimal(walletBalance.amount).minus(amount).toNumber();
    await walletBalance.save({ transaction: t });

    await Transaction.create({
      wallet_balance_id,
      type: TransactionType.WITHDRAW,
      amount,
      rate_to: 1,
    }, { transaction: t });

    await t.commit();
    await lock.release();
    return res.status(201).json(responseMessage('Withdrawal successful'));
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Payment
export const payForProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { wallet_balance_id, amount } = req.body;

  const t = await sequelize.transaction();
  const lockKey = `lock:wallet-balance:${wallet_balance_id}`;
  try {
    const lock = await acquireLock(lockKey);
    const walletBalance = await WalletBalance.findByPk(wallet_balance_id, { transaction: t });
    if (!walletBalance) throw new AppError('Wallet balance not found', 404);
    if (walletBalance.amount < amount) throw new AppError('Insufficient funds', 400);

    walletBalance.amount = new Decimal(walletBalance.amount).minus(amount).toNumber();
    await walletBalance.save({ transaction: t });

    await Transaction.create({
      wallet_balance_id,
      type: TransactionType.PAYMENT,
      amount,
      rate_to: 1,
    }, { transaction: t });

    await t.commit();
    await lock.release();
    return res.status(201).json(responseMessage('Payment successful'));
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Transfer
export const transfer = async (req: Request, res: Response, next: NextFunction) => {
  const { from_wallet_balance_id, to_wallet_balance_id, amount } = req.body;
    
  const t = await sequelize.transaction();
  const lockFromKey = `lock:wallet-balance:${from_wallet_balance_id}`;
  const lockToKey = `lock:wallet-balance:${to_wallet_balance_id}`;
  try {
    const locks = await acquireLock([lockFromKey, lockToKey]);
    const fromBalance = await WalletBalance.findByPk(from_wallet_balance_id, { transaction: t });
    const toBalance = await WalletBalance.findByPk(to_wallet_balance_id, { transaction: t });

    if (!fromBalance || !toBalance) throw new AppError('Wallet balance not found', 404);

    const fromWallet = await Wallet.findByPk(fromBalance.wallet_id, { transaction: t });
    const toWallet = await Wallet.findByPk(toBalance.wallet_id, { transaction: t });

    if (!fromWallet || !toWallet) throw new AppError('Wallet not found', 404);
    if (fromWallet.user_id !== toWallet.user_id) throw new AppError('You can only transfer between your own wallets', 403);
    if (fromBalance.amount < amount) throw new AppError('Insufficient funds', 400);

    const rate = await getLatestRate(fromBalance.currency_code, toBalance.currency_code);
    const convertedAmount = amount * rate;

    fromBalance.amount = new Decimal(fromBalance.amount).minus(amount).toNumber();
    toBalance.amount = new Decimal(toBalance.amount).plus(convertedAmount).toNumber();

    await fromBalance.save({ transaction: t });
    await toBalance.save({ transaction: t });

    await Transaction.create({
      wallet_balance_id: fromBalance.id,
      related_wallet_balance_id: toBalance.id,
      type: TransactionType.TRANSFER,
      amount,
      rate_to: rate,
    }, { transaction: t });

    await t.commit();
    await locks.release();
    return res.status(201).json(responseMessage('Transfer successful'));
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
