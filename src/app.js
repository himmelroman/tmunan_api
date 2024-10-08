const express = require('express');
const app = express();
const dev = require('./dev');

// Middleware for parsing JSON requests
app.use(express.json());

app.get('/public', (req, res) => {
  res.send('This is a public endpoint.');
});

app.get('/private', (req, res) => {
  res.send('This is a private endpoint. Only accessible with valid token.');
});

app.get('/dbtest', (req, res) => {
    dev.testDb();
    res.send('Database test successful.');
});

module.exports = app;
