// Configuração da conexão com o banco de dados
const { Pool } = require('pg'); // exemplo com PostgreSQL
const dbConfig = require('../config/dbConfig');

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

pool.on('error', (err) => {
  console.error('Erro inesperado na conexão com o banco:', err);
  process.exit(-1);
});

module.exports = pool;
