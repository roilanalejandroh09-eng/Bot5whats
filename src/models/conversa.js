// Model de Conversa
const pool = require('../database/conexao');

async function criarConversa(usuarioId, estado = 'ativa') {
  const result = await pool.query(
    `INSERT INTO conversas (usuario_id, estado) VALUES ($1, $2) RETURNING *`,
    [usuarioId, estado]
  );
  return result.rows[0];
}

async function buscarConversaPorUsuario(usuarioId) {
  const result = await pool.query(
    `SELECT * FROM conversas WHERE usuario_id = $1 AND estado = 'ativa'`,
    [usuarioId]
  );
  return result.rows[0];
}

async function encerrarConversa(conversaId) {
  const result = await pool.query(
    `UPDATE conversas SET estado = 'encerrada', encerrado_em = NOW() WHERE id = $1 RETURNING *`,
    [conversaId]
  );
  return result.rows[0];
}

module.exports = { criarConversa, buscarConversaPorUsuario, encerrarConversa };
