// Serviço de notificações automáticas
const { enviarMensagem } = require('../whatsapp/enviarMensagem');

async function enviarNotificacao(destinatario, mensagem) {
  try {
    console.log(`Enviando notificação para ${destinatario}: ${mensagem}`);
    await enviarMensagem(destinatario, mensagem);
    return { sucesso: true };
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return { sucesso: false, erro: error.message };
  }
}

module.exports = { enviarNotificacao };
