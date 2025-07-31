import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import WalletBalance from './WalletBalance';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw', 
  PAYMENT = 'payment',
  TRANSFER = 'transfer'
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}


class Transaction extends Model {
  public id!: number;
  public wallet_balance_id!: number;
  public related_wallet_balance_id?: number;
  public amount!: number;
  public type!: TransactionType;
  public status!: TransactionStatus;
  public note?: string;
  public rate_to?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wallet_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'WalletBalances', key: 'id' },
      onDelete: 'CASCADE',
    },
    related_wallet_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'WalletBalances', key: 'id' },
      onDelete: 'SET NULL',
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal', 'payment'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed'),
      allowNull: false,
      defaultValue: 'success',
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rate_to: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
    timestamps: true, // includes createdAt and updatedAt
  }
);

Transaction.belongsTo(WalletBalance, { foreignKey: 'wallet_balance_id' });
WalletBalance.hasMany(Transaction, { foreignKey: 'wallet_balance_id' });

export default Transaction;