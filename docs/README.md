# E-Wallet API Documentation

This directory contains the generated API documentation for the E-Wallet system.

## 📁 Files

- `openapi.json` - OpenAPI 3.0 specification file
- `index.html` - Standalone HTML documentation viewer
- `README.md` - This file

## 🚀 How to Use

### Option 1: Interactive Documentation (Recommended)
1. Start your development server: `npm run dev`
2. Open your browser and go to: `http://localhost:5000/api-docs`
3. This provides an interactive Swagger UI where you can:
   - View all API endpoints
   - Test API calls directly from the browser
   - See request/response schemas
   - Authenticate with JWT tokens

### Option 2: Static Documentation
1. Generate static documentation: `npm run docs:generate`
2. Open `docs/index.html` in your browser
3. Or serve it locally: `npm run docs:serve`

### Option 3: External Tools
1. Generate the OpenAPI spec: `npm run docs:generate`
2. Use external tools like:
   - [Swagger Editor](https://editor.swagger.io/) - Upload `openapi.json`
   - [Postman](https://www.postman.com/) - Import the OpenAPI spec
   - [Insomnia](https://insomnia.rest/) - Import the OpenAPI spec

## 🔐 Authentication

Most endpoints require JWT authentication. To authenticate:

1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Copy the JWT token from the response
4. In the Swagger UI, click the "Authorize" button
5. Enter your token in the format: `Bearer YOUR_JWT_TOKEN`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Wallets
- `POST /api/wallets` - Create a new wallet
- `GET /api/wallets` - Get all user wallets
- `GET /api/wallets/{id}` - Get specific wallet
- `GET /api/wallets/{id}/total-balance` - Get wallet total balance

### Wallet Balances
- `POST /api/wallet-balances` - Create wallet balance

### Transactions
- `POST /api/transactions/deposit` - Deposit money
- `POST /api/transactions/withdraw` - Withdraw money
- `POST /api/transactions/payment` - Pay for product
- `POST /api/transactions/transfer` - Transfer between wallets

## 🔧 Development

### Adding New Endpoints
1. Add JSDoc comments to your route files using the `@swagger` annotation
2. Follow the existing pattern in the route files
3. Include request body schemas, parameters, and response examples
4. Regenerate documentation: `npm run docs:generate`

### Example JSDoc Comment
```javascript
/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Example endpoint
 *     tags: [Example]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
```

### Updating Documentation
- Run `npm run docs:generate` to regenerate the OpenAPI spec
- The interactive documentation at `/api-docs` updates automatically when you restart the server

## 📊 Data Models

The API uses the following main data models:
- **User** - User account information
- **Wallet** - User wallet details
- **WalletBalance** - Wallet balance information
- **Transaction** - Transaction records
- **Error** - Error response format

## 🌐 Environment

- **Development**: `http://localhost:5000`
- **Production**: `https://api.ewallet.com`

## 📞 Support

For API support, contact: support@ewallet.com 