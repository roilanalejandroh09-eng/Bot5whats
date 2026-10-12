// Model de Usuário
const pool = require('../database/conexao');

async function criarUsuario(whatsappId, nome) {
  const result = await pool.query(
    `INSERT INTO usuarios (whatsapp_id, nome) VALUES ($1, $2) RETURNING *`,
    [whatsappId, nome]
  );
  return result.rows[0];
}

async function buscarUsuarioPorWhatsappId(whatsappId) {
  const result = await pool.query(
    `SELECT * FROM usuarios WHERE whatsapp_id = $1`,
    [whatsappId]
  );
  return result.rows[0];
}

module.exports = { criarUsuario, buscarUsuarioPorWhatsappId };
