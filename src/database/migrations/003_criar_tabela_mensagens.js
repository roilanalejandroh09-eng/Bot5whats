// Migração para criar tabela de mensagens
const pool = require('../conexao');

async function up() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mensagens (
      id SERIAL PRIMARY KEY,
      conversa_id INT REFERENCES conversas(id),
      conteudo TEXT NOT NULL,
      tipo VARCHAR(20), -- recebido ou enviado
      status VARCHAR(20), -- entregue, lido, falha
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
}

async function down() {
  await pool.query(`DROP TABLE IF EXISTS mensagens;`);
}

module.exports = { up, down };
