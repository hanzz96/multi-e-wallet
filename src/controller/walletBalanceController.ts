// controllers/walletBalanceController.ts
import { Request, Response, NextFunction } from 'express';
import WalletBalance from '../models/WalletBalance';
import Wallet from '../models/Wallet';
import Currencies from '../models/Currencies';
import { AppError } from '../utils/appError';
import { responsePayload } from '../utils/response';

export const createWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wallet_id, currency_code, initial_amount = 0 } = req.body;

    if (!wallet_id || !currency_code) {
      return next(new AppError('walletId and currencyCode are required', 400));
    }
    const wallet = await Wallet.findByPk(wallet_id);
    if (!wallet) {
      return next(new AppError('Wallet not found', 404));
    }

    const currency = await Currencies.findOne({ where: { code: currency_code } });
    if (!currency) {
      return next(new AppError('Currency not found', 404));
    }

    const existingBalance = await WalletBalance.findOne({
      where: { wallet_id: wallet_id, currency_code: currency_code },
    });

    if (existingBalance) {
      return next(new AppError('Balance for this currency already exists in the wallet', 400));
    }

    const balance = await WalletBalance.create({
      wallet_id: wallet_id,
      currency_code: currency_code,
      amount: initial_amount,
    });

    return responsePayload(res, 201, {
      message: 'Wallet balance created successfully',
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};
