import { Request, Response, NextFunction } from "express";
import Wallet from "../models/Wallet";
import WalletBalance from "../models/WalletBalance";
import Currencies from "../models/Currencies";
import { AppError } from "../utils/appError";
import { responseMessage, responsePayload } from "../utils/response";

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
            where: { userId, name },
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

export const getWalletBalances = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletId = parseInt(req.params.id);
      if (isNaN(walletId)) {
        return next(new AppError('Invalid wallet ID', 400));
      }
      console.log(walletId,'walletId')
      // Step 1: Check wallet existence
      const wallet = await Wallet.findByPk(walletId);
      console.log(wallet,'wallet')
      if (!wallet) {
        return next(new AppError('Wallet not found', 404));
      }
  
      // Step 2: Get wallet balances
      const balances = await WalletBalance.findAll({ where: { wallet_id: walletId } });
  
      // Step 3: Attach currency details to each balance
      const detailedBalances = await Promise.all(
        balances.map(async (balance) => {
          const currency = await Currencies.findByPk(balance.currency_code);
          return {
            id: balance.id,
            walletId: balance.wallet_id,
            currencyId: balance.currency_code,
            amount: balance.amount,
            currency: currency ? {
              id: currency.id,
              code: currency.code,
              rateToUSD: currency.rateToUSD,
            } : null,
          };
        })
      );
  
      return responsePayload(res, 200, {
        wallet,
        balances: detailedBalances,
      });
    } catch (error) {
      next(error);
    }
  };
  

export const getWalletTotalBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const walletId = parseInt(req.params.id);
        const displayCurrency = (req.query.currency as string) || "USD";

        if (!displayCurrency) {
            return next(new AppError("Display currency required", 400));
        }

        const wallet = await Wallet.findByPk(walletId, {
            include: [
                {
                    model: WalletBalance,
                    include: [Currencies],
                },
            ],
        });

        if (!wallet) {
            return next(new AppError("Wallet not found", 404));
        }

        const displayCurrencyRate = await Currencies.findOne({
            where: { code: displayCurrency },
        });
        if (!displayCurrencyRate) {
            return next(new AppError("Invalid display currency", 400));
        }

        let total = 0;
        for (const balance of wallet.WalletBalances) {
            total +=
                balance.amount *
                (balance.Currencies.rateToUSD / displayCurrencyRate.rateToUSD);
        }

        return responsePayload(res, 200, {
            walletId,
            total,
            currency: displayCurrency,
        });
    } catch (error) {
        next(error);
    }
};
