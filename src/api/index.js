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

module.exports = app;
