const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Import the same options from the main swagger config
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
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'User ID' },
            email: { type: 'string', format: 'email', description: 'User email address' },
            username: { type: 'string', description: 'Username' },
            createdAt: { type: 'string', format: 'date-time', description: 'User creation timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'User last update timestamp' }
          }
        },
        Wallet: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Wallet ID' },
            userId: { type: 'integer', description: 'User ID who owns the wallet' },
            name: { type: 'string', description: 'Wallet name' },
            currency: { type: 'string', description: 'Currency code (USD, EUR, etc.)' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        WalletBalance: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Balance ID' },
            walletId: { type: 'integer', description: 'Wallet ID' },
            balance: { type: 'number', format: 'decimal', description: 'Current balance amount' },
            currency: { type: 'string', description: 'Currency code' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Transaction ID' },
            fromWalletId: { type: 'integer', description: 'Source wallet ID' },
            toWalletId: { type: 'integer', description: 'Destination wallet ID' },
            amount: { type: 'number', format: 'decimal', description: 'Transaction amount' },
            currency: { type: 'string', description: 'Currency code' },
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
            rate: { type: 'number', format: 'decimal', description: 'Exchange rate used for the transaction' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', description: 'Error status' },
            message: { type: 'string', description: 'Error message' },
            stack: { type: 'string', description: 'Error stack trace (development only)' }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Wallets', description: 'Wallet management endpoints' },
      { name: 'Wallet Balances', description: 'Wallet balance management endpoints' },
      { name: 'Transactions', description: 'Transaction management endpoints' }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controller/*.ts',
    './src/models/*.ts'
  ]
};

// Generate the OpenAPI specification
const specs = swaggerJsdoc(options);

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Write the OpenAPI specification to a JSON file
const outputPath = path.join(docsDir, 'openapi.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

console.log(`✅ API documentation generated successfully!`);
console.log(`📁 Output file: ${outputPath}`);
console.log(`🌐 You can view it at: http://localhost:5000/api-docs`);
console.log(`📖 Or use tools like: https://editor.swagger.io/`);

// Generate a simple HTML file for viewing the documentation
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Wallet API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: './openapi.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>`;

const htmlPath = path.join(docsDir, 'index.html');
fs.writeFileSync(htmlPath, htmlTemplate);

console.log(`📄 HTML documentation: ${htmlPath}`);
console.log(`🚀 Open ${htmlPath} in your browser to view the documentation`); 