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

app.get('/dbtest', async (req, res) => {
    try {
        await dev.testDb();
        res.send('Database test successful.');
    } catch (error) {
        console.error('Error during database test:', error);
        res.status(500).send('Database test failed.');
    }
});

module.exports = app;
