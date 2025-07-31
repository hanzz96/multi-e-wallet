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



🔒 Critical Considerations & Design Principles

1. Race Conditions & Concurrency

🔁 Potential Race Conditions:
        
Simultaneous withdrawals, deposits, or transfers on the same wallet balance can lead to:

Incorrect balance updates

Double-spending or overdrafts

*Mitigation Strategy*:
        
        Redis-based Distributed Locking (Redlock):

Locks per wallet_balance_id using Redis with retry and jitter redlock to ensure one transaction modifies balance at a time.


Both from_wallet_balance_id and to_wallet_balance_id are locked to prevent cross-wallet conflicts.

✅ Justification:
This strategy avoids complexity of optimistic locking and queues, while being scalable and fast for the scope of this test.

2. Beyond Core Functionality
🔐 Security
JWT-based authentication (can be extended with MFA)

Redis lock limits rapid-fire abuse

Rate-limiting(not implemented) & authorization ready

🚀 Scalability
Stateless backend: Scales easily horizontally.

Can integrate message queues or shard wallets by user later.

Designed with Redis for low-latency coordination.

🧱 Maintainability & Extensibility
Modular route + controller structure

Easily extendable for:

Additional currencies

New transaction types (e.g., LOYALTY, REFUND)

📝 Auditability & Logging
All transactions persisted with type, source, and related balance

Future logging (e.g., Winston or external log aggregators) ready

can trace operations for audit/compliance

⚡ Backend-driven UX
Consistent

Designed for fast feedback on concurrency errors (e.g., lock timeout = 429)

💥 Fault Tolerance & Resilience
If Redis is down, operations fail fast and cleanly

DB transactions rollback on error

Errors handler caught and formatted with AppError utility

