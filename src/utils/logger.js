// Utilitário para registro de eventos e logs
const appConfig = require('../config/appConfig');

function logInfo(mensagem) {
  if (appConfig.nivelLogs === 'info' || appConfig.nivelLogs === 'debug') {
    console.log(`[INFO] ${mensagem}`);
  }
}

function logDebug(mensagem) {
  if (appConfig.nivelLogs === 'debug') {
    console.log(`[DEBUG] ${mensagem}`);
  }
}

function logError(mensagem, erro) {
  console.error(`[ERROR] ${mensagem}`, erro || '');
}

module.exports = { logInfo, logDebug, logError };
