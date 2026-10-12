// Responsável por processar eventos recebidos do WhatsApp

function processarEvento(evento) {
  try {
    // TODO: validar evento (ex.: checar assinatura)
    // TODO: extrair dados relevantes (remetente, mensagem, timestamp)
    console.log('Mensagem recebida:', evento);

    // Encaminhar para núcleo do chatbot
    // Exemplo: chatbot.interpretarMensagem(evento)

    return { sucesso: true };
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return { sucesso: false, erro: error.message };
  }
}

module.exports = { processarEvento };
