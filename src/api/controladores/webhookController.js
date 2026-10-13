// Controlador responsável por lidar com eventos do WhatsApp

const crypto = require('crypto');
const enviarMensagemTexto = require('../../whatsapp/enviarMensagemTexto');

const mensagemInicial =
  'Olá! Sou o assistente virtual da Bot5Whats. Como posso ajudar você hoje?';

const responderMensagensRecebidas = async (evento) => {
  for (const entrada of evento.entry) {
    for (const alteracao of entrada.changes) {
      const mensagens = Array.isArray(alteracao.value.messages)
        ? alteracao.value.messages
        : [];

      for (const mensagem of mensagens) {
        if (typeof mensagem.from !== 'string' || !mensagem.from) {
          console.error('Mensagem recebida sem identificador de destinatário.');
          continue;
        }

        await enviarMensagemTexto(mensagem.from, mensagemInicial);
      }
    }
  }
};

exports.verificarWebhook = (req, res) => {
  const modo = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const desafio = req.query['hub.challenge'];
  const tokenConfigurado = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!tokenConfigurado) {
    console.error('WHATSAPP_VERIFY_TOKEN não está configurado.');
    return res.status(500).send('Webhook não configurado');
  }

  if (
    modo !== 'subscribe' ||
    typeof token !== 'string' ||
    typeof desafio !== 'string'
  ) {
    return res.status(400).send('Solicitação de verificação inválida');
  }

  const tokenBuffer = Buffer.from(token);
  const configuradoBuffer = Buffer.from(tokenConfigurado);
  const tokenValido =
    tokenBuffer.length === configuradoBuffer.length &&
    crypto.timingSafeEqual(tokenBuffer, configuradoBuffer);

  if (!tokenValido) {
    return res.status(403).send('Token de verificação inválido');
  }

  return res.status(200).type('text/plain').send(desafio);
};

exports.receberMensagem = (req, res) => {
  console.log('Evento válido recebido do WhatsApp.');
  res.status(200).send({ sucesso: true });

  setImmediate(() => {
    responderMensagensRecebidas(req.body).catch((error) => {
      console.error('Erro ao enviar resposta pelo WhatsApp:', error.message);
    });
  });
};

exports.status = (req, res) => {
  res.status(200).send({ status: 'Chatbot ativo' });
};
