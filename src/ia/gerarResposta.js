const modelo = process.env.OPENAI_MODEL || 'gpt-4o-mini';

module.exports = async (mensagem) => {
  const chaveApi = process.env.OPENAI_API_KEY;
  if (!chaveApi) {
    throw new Error('OPENAI_API_KEY não está configurada.');
  }

  const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${chaveApi}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: modelo,
      messages: [
        {
          role: 'system',
          content:
            'Você é o assistente virtual da Bot5Whats. Responda em português ' +
            'brasileiro, com clareza e simpatia. Seja conciso, responda ao que ' +
            'a pessoa perguntou e não invente informações sobre produtos, ' +
            'preços, pedidos ou serviços da empresa. Se não souber, diga isso ' +
            'e faça uma pergunta para entender melhor.'
        },
        { role: 'user', content: mensagem }
      ],
      max_tokens: 250
    }),
    signal: AbortSignal.timeout(20000)
  });

  if (!resposta.ok) {
    throw new Error(`A API OpenAI recusou a solicitação (HTTP ${resposta.status}).`);
  }

  const resultado = await resposta.json();
  const texto = resultado.choices?.[0]?.message?.content;
  if (typeof texto !== 'string' || !texto.trim()) {
    throw new Error('A API OpenAI não retornou uma resposta de texto.');
  }

  return texto.trim();
};
