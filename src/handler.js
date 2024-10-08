const serverless = require('serverless-http');
const app = require('./app'); // Import the Express app

// Global error handler for Lambda
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).send('Internal Server Error');
});

module.exports.handler = serverless(app);
