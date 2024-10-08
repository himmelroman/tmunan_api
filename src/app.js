const express = require('express');
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

app.get('/public', (req, res) => {
  res.send('This is a public endpoint.');
});

app.get('/private', (req, res) => {
  res.send('This is a private endpoint. Only accessible with valid token.');
});

module.exports = app;
