// Serviço de gerenciamento de conversas
const usuarioModel = require('../models/usuario');
const conversaModel = require('../models/conversa');
const mensagemModel = require('../models/mensagem');
const { identificarIntencao } = require('../chatbot/intencoes');
const { aplicarRegras } = require('../chatbot/regras');
const { gerarResposta } = require('../chatbot/respostas');
const { enviarMensagem } = require('../whatsapp/enviarMensagem');

async function processarMensagem(evento) {
  try {
    const { remetente, conteudo } = evento;

    // Buscar ou criar usuário
    let usuario = await usuarioModel.buscarUsuarioPorWhatsappId(remetente);
    if (!usuario) {
      usuario = await usuarioModel.criarUsuario(remetente, 'Desconhecido');
    }

    // Buscar ou iniciar conversa
    let conversa = await conversaModel.buscarConversaPorUsuario(usuario.id);
    if (!conversa) {
      conversa = await conversaModel.criarConversa(usuario.id);
    }

    // Registrar mensagem recebida
    await mensagemModel.registrarMensagem(conversa.id, conteudo, 'recebida');

    // Interpretar intenção e aplicar regras
    const intencao = identificarIntencao(conteudo);
    const tipoResposta = aplicarRegras(intencao, conversa);
    const resposta = gerarResposta(tipoResposta);

    // Registrar mensagem enviada
    const msgEnviada = await mensagemModel.registrarMensagem(conversa.id, resposta, 'enviada');

    // Enviar resposta pelo WhatsApp
    await enviarMensagem(remetente, resposta);

    return { sucesso: true, resposta };
  } catch (error) {
    console.error('Erro no processamento da conversa:', error);
    return { sucesso: false, erro: error.message };
  }
}

module.exports = { processarMensagem };
