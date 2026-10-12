// Model de Mensagem
const pool = require('../database/conexao');

async function registrarMensagem(conversaId, conteudo, tipo, status = 'pendente') {
  const result = await pool.query(
    `INSERT INTO mensagens (conversa_id, conteudo, tipo, status) VALUES ($1, $2, $3, $4) RETURNING *`,
    [conversaId, conteudo, tipo, status]
  );
  return result.rows[0];
}

async function atualizarStatusMensagem(mensagemId, status) {
  const result = await pool.query(
    `UPDATE mensagens SET status = $1 WHERE id = $2 RETURNING *`,
    [status, mensagemId]
  );
  return result.rows[0];
}

module.exports = { registrarMensagem, atualizarStatusMensagem };
