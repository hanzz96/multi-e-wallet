import { Request, Response, NextFunction } from "express";
import Wallet from "../models/Wallet";
import WalletBalance from "../models/WalletBalance";
import Currencies from "../models/Currencies";
import { AppError } from "../utils/appError";
import { responseMessage, responsePayload } from "../utils/response";
import CurrencyRate from "../models/CurrencyRate";
import Decimal from "decimal.js";
import { Op } from "sequelize";

export const createWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        if (!name) {
            return next(new AppError("Wallet name is required", 400));
        }

        const existingWallet = await Wallet.findOne({
            where: { user_id: userId, name },
        });

        if (existingWallet) {
            return next(
                new AppError("Wallet name must be unique per user", 400)
            );
        }

        const wallet = await Wallet.create({ user_id: userId, name });

        return responsePayload(res, 201, {
            message: "Wallet created successfully",
            wallet: wallet,
        });
    } catch (error) {
        next(error);
    }
};

export const listWallets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wallets = await Wallet.findAll({
        where: { user_id: req.user.id },
        include: [
          {
            model: WalletBalance,
            include: [Currencies],
          },
        ],
      });
  
      const result = wallets.map(wallet => ({
        id: wallet.id,
        name: wallet.name,
        balances: wallet.WalletBalances?.map(balance => ({
          id: balance.id,
          currency: balance.currency_code,
          amount: balance.amount.toString(),
        })),
      }));
  
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  export const getWalletById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const wallet = await Wallet.findByPk(req.params.id, {
        include: WalletBalance,
      });

      return responsePayload(res, 200, {
        message: "Wallet fetched successfully",
        wallet: wallet,
      });
    } catch (err) {
      next(err);
    }
  }

  export const getTotalWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletId = parseInt(req.params.id, 10);
      const targetCurrency = req.query.currency as string;
  
      if (!targetCurrency) {
        return next(new AppError('Target currency is required', 400));
      }
  
      const wallet = await Wallet.findByPk(walletId);
      if (!wallet) {
        return next(new AppError('Wallet not found', 404));
      }
  
      const balances = await WalletBalance.findAll({
        where: { wallet_id: walletId },
      });
  
      let total = 0;
  
      for (const balance of balances) {
        const fromCurrency = balance.currency_code;
  
        let rate = 1;
  
        if (fromCurrency !== targetCurrency) {
          const rateRecord = await CurrencyRate.findOne({
            where: {
              currency_code: fromCurrency,
              to_currency_code: targetCurrency,
              end_date: { [Op.is]: null },
            },
          });
  
          if (!rateRecord) {
            return res.status(400).json({ message: `Missing conversion rate from ${fromCurrency} to ${targetCurrency}` });
          }
  
          rate = parseFloat(rateRecord.to_currency_rate.toString());
        }
  
        total += balance.amount * rate;
      }
  
      return res.json({
        wallet_id: walletId,
        currency: targetCurrency,
        total_balance: parseFloat(total.toFixed(2)),
      });
    } catch (error) {
      next(error);
    }
  };