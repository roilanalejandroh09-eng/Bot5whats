// Migração para criar tabela de conversas
const pool = require('../conexao');

async function up() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversas (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES usuarios(id),
      estado VARCHAR(50),
      iniciado_em TIMESTAMP DEFAULT NOW(),
      encerrado_em TIMESTAMP
    );
  `);
}

async function down() {
  await pool.query(`DROP TABLE IF EXISTS conversas;`);
}

module.exports = { up, down };
