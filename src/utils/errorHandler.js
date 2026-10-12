// Utilitário para tratamento de erros
const { logError } = require('./logger');

function tratarErro(err, contexto = '') {
  logError(`Erro no contexto: ${contexto}`, err);

  return {
    sucesso: false,
    mensagem: 'Ocorreu um erro interno. Tente novamente mais tarde.',
    detalhe: err.message
  };
}

module.exports = { tratarErro };
