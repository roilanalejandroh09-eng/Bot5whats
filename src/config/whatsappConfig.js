// Configuração da integração com WhatsApp
require('dotenv').config();

const whatsappConfig = {
  token: process.env.WHATSAPP_TOKEN || '',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  webhookUrl: process.env.WHATSAPP_WEBHOOK_URL || '',
  apiVersion: process.env.WHATSAPP_API_VERSION || 'v26.0'
};

module.exports = whatsappConfig;
