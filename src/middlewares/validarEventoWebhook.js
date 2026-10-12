module.exports = (req, res, next) => {
  const evento = req.body;
  const entradaValida =
    evento &&
    evento.object === 'whatsapp_business_account' &&
    Array.isArray(evento.entry) &&
    evento.entry.length > 0 &&
    evento.entry.every(
      (entrada) =>
        entrada &&
        Array.isArray(entrada.changes) &&
        entrada.changes.length > 0 &&
        entrada.changes.every(
          (alteracao) =>
            alteracao &&
            typeof alteracao.field === 'string' &&
            alteracao.value &&
            typeof alteracao.value === 'object' &&
            !Array.isArray(alteracao.value)
        )
    );

  if (!entradaValida) {
    return res.status(400).send({ erro: 'Formato de evento do WhatsApp inválido' });
  }

  return next();
};
