const appConfig = require('./config/appConfig');
const app = require('./api');

const port = Number(appConfig.porta);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Chatbot API ouvindo na porta ${port}`);
});

server.on('error', (error) => {
  console.error('Não foi possível iniciar o servidor:', error);
  process.exitCode = 1;
});
