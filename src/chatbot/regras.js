// Define regras e fluxos de conversação

function aplicarRegras(intencao, contexto) {
  switch (intencao) {
    case 'saudacao':
      return 'resposta_saudacao';
    case 'pedido_ajuda':
      return 'resposta_ajuda';
    default:
      return 'resposta_padrao';
  }
}

module.exports = { aplicarRegras };
