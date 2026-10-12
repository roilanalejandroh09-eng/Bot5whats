// Controlador responsável por lidar com eventos do WhatsApp

const crypto = require('crypto');

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
  try {
    const evento = req.body;

    // TODO: extrair dados da mensagem (remetente, texto, timestamp)
    // TODO: encaminhar para núcleo do chatbot

    console.log('Evento válido recebido do WhatsApp.');

    res.status(200).send({ sucesso: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send({ erro: 'Falha ao processar evento' });
  }
};

exports.status = (req, res) => {
  res.status(200).send({ status: 'Chatbot ativo' });
};
