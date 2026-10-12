// Responsável por identificar a intenção do usuário

function identificarIntencao(mensagem) {
  // TODO: implementar lógica de NLP ou regras simples
  const texto = mensagem.toLowerCase();

  if (texto.includes('oi') || texto.includes('olá')) {
    return 'saudacao';
  }
  if (texto.includes('ajuda')) {
    return 'pedido_ajuda';
  }

  return 'desconhecida';
}

module.exports = { identificarIntencao };
