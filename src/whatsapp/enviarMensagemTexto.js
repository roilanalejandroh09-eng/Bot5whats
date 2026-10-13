const whatsappConfig = require('../config/whatsappConfig');

module.exports = async (destinatario, texto) => {
  if (!whatsappConfig.token || !whatsappConfig.phoneNumberId) {
    throw new Error(
      'WHATSAPP_TOKEN e WHATSAPP_PHONE_NUMBER_ID precisam estar configurados.'
    );
  }

  const url =
    `https://graph.facebook.com/${whatsappConfig.apiVersion}/` +
    `${whatsappConfig.phoneNumberId}/messages`;
  const resposta = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${whatsappConfig.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: destinatario,
      type: 'text',
      text: {
        body: texto
      }
    }),
    signal: AbortSignal.timeout(10000)
  });

  if (!resposta.ok) {
    throw new Error(
      `A API do WhatsApp recusou o envio (HTTP ${resposta.status}).`
    );
  }
};
