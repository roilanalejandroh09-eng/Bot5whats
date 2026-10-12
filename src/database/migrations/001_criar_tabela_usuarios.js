// Migração para criar tabela de usuários
const pool = require('../conexao');

async function up() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      whatsapp_id VARCHAR(50) UNIQUE NOT NULL,
      nome VARCHAR(100),
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
}

async function down() {
  await pool.query(`DROP TABLE IF EXISTS usuarios;`);
}

module.exports = { up, down };
