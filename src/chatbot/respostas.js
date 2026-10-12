// Gera respostas apropriadas para cada intenção

function gerarResposta(tipoResposta) {
  const respostas = {
    resposta_saudacao: 'Olá! Como posso ajudar você hoje?',
    resposta_ajuda: 'Claro, me diga qual é a sua dúvida.',
    resposta_padrao: 'Desculpe, não entendi sua mensagem. Pode reformular?'
  };

  return respostas[tipoResposta] || respostas.resposta_padrao;
}

module.exports = { gerarResposta };
