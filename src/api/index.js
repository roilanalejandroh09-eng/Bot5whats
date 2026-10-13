const path = require('path');
const express = require('express');
const app = express();
const webhookRotas = require('./rotas/webhook');

app.use(express.json({
  verify: (req, res, buffer) => {
    req.rawBody = Buffer.from(buffer);
  },
}));

// Rotas da API
app.use('/api', webhookRotas);
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

module.exports = app;
