// Configurações gerais da aplicação
require('dotenv').config();

const appConfig = {
  ambiente: process.env.NODE_ENV || 'development',
  porta: process.env.PORT || 3000,
  nivelLogs: process.env.LOG_LEVEL || 'info'
};

module.exports = appConfig;
