# Wallet API Service

This is a Node.js-based wallet management API with support for deposits, withdrawals, payments, and transfers. It includes Redis-based locking for concurrency safety and API documentation support.

## ✅ Requirements

- **Node.js** `v22.14.0`
- **Docker & Docker Compose**

---

## 🚀 Getting Started

1. **Start Docker services**

   ```bash
   docker-compose up -d

2. **Copy example env**

    cp .env.example .env

3. **Run NPM**
    npm install

    npx sequelize-cli db:migrate

    npx sequelize-cli db:seed:all 

    npm run docs:generate

    npm run docs:serve

4. **Start the server!**
    npm run dev

5. **Docs Api route**
http://localhost:5000/docs
