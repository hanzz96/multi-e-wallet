"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            wallet_balance_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "WalletBalances", key: "id" },
                onDelete: "CASCADE",
            },
            related_wallet_balance_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "WalletBalances", key: "id" },
                onDelete: "SET NULL",
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM("deposit", "withdraw", "transfer"),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM("pending", "success", "failed"),
                defaultValue: "success",
            },
            note: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Transactions");
    },
};
