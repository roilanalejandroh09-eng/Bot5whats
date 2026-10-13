const crypto = require('crypto');

module.exports = (req, res, next) => {
  const appSecret = process.env.META_APP_SECRET;

  if (!appSecret) {
    console.error('META_APP_SECRET não está configurado.');
    return res.status(500).send({ erro: 'Webhook não configurado' });
  }

  const assinatura = req.get('x-hub-signature-256');
  const assinaturaValida =
    typeof assinatura === 'string' && /^sha256=[a-f0-9]{64}$/i.test(assinatura);

  if (!assinaturaValida || !Buffer.isBuffer(req.rawBody)) {
    console.warn('POST do webhook recusado: assinatura ausente ou inválida.');
    return res.status(401).send({ erro: 'Assinatura do webhook inválida' });
  }

  const assinaturaEsperada = crypto
    .createHmac('sha256', appSecret)
    .update(req.rawBody)
    .digest();
  const assinaturaRecebida = Buffer.from(assinatura.slice('sha256='.length), 'hex');

  if (!crypto.timingSafeEqual(assinaturaEsperada, assinaturaRecebida)) {
    console.warn('POST do webhook recusado: assinatura não corresponde ao app.');
    return res.status(401).send({ erro: 'Assinatura do webhook inválida' });
  }

  return next();
};
