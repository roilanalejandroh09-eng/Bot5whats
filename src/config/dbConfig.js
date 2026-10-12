// Configuração do banco de dados
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'usuario',
  password: process.env.DB_PASSWORD || 'senha',
  database: process.env.DB_NAME || 'chatbot_db'
};

module.exports = dbConfig;
