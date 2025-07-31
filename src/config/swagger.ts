import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Wallet API Documentation',
      version: '1.0.0',
      description: 'API documentation for the E-Wallet system with multi-currency support',
      contact: {
        name: 'API Support',
        email: 'support@ewallet.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.ewallet.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        users: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            name: {
              type: 'string',
              description: 'name'
            },
            password: {
              type: 'string',
              description: 'password'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        Wallet: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Wallet ID'
            },
            userId: {
              type: 'integer',
              description: 'User ID who owns the wallet'
            },
            name: {
              type: 'string',
              description: 'Wallet name'
            },
            currency: {
              type: 'string',
              description: 'Currency code (USD, EUR, etc.)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        WalletBalance: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Balance ID'
            },
            walletId: {
              type: 'integer',
              description: 'Wallet ID'
            },
            balance: {
              type: 'number',
              format: 'decimal',
              description: 'Current balance amount'
            },
            currency: {
              type: 'string',
              description: 'Currency code'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Transaction ID'
            },
            fromWalletId: {
              type: 'integer',
              description: 'Source wallet ID'
            },
            toWalletId: {
              type: 'integer',
              description: 'Destination wallet ID'
            },
            amount: {
              type: 'number',
              format: 'decimal',
              description: 'Transaction amount'
            },
            currency: {
              type: 'string',
              description: 'Currency code'
            },
            type: {
              type: 'string',
              enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'],
              description: 'Transaction type'
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
              description: 'Transaction status'
            },
            rate: {
              type: 'number',
              format: 'decimal',
              description: 'Exchange rate used for the transaction'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Error status'
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            stack: {
              type: 'string',
              description: 'Error stack trace (development only)'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints'
      },
      {
        name: 'Wallets',
        description: 'Wallet management endpoints'
      },
      {
        name: 'Wallet Balances',
        description: 'Wallet balance management endpoints'
      },
      {
        name: 'Transactions',
        description: 'Transaction management endpoints'
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controller/*.ts',
    './src/models/*.ts'
  ]
};

export const specs = swaggerJsdoc(options); 