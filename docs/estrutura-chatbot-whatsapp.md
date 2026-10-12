# Estrutura de um Chatbot para WhatsApp

## 1. Visão geral

Aplicação responsável por receber mensagens do WhatsApp, processá-las conforme as regras do chatbot e enviar respostas aos usuários.

## 2. Estrutura de diretórios

```text
chatbot-whatsapp/
├── docs/
│   └── arquitetura.md
├── src/
│   ├── config/
│   │   └── configuracoes da aplicação
│   ├── api/
│   │   ├── rotas
│   │   └── controladores
│   ├── whatsapp/
│   │   ├── integração com a API do WhatsApp
│   │   ├── recebimento de mensagens
│   │   └── envio de mensagens
│   ├── chatbot/
│   │   ├── identificação de intenções
│   │   ├── regras de conversação
│   │   └── respostas
│   ├── services/
│   │   ├── gerenciamento de conversas
│   │   └── notificações
│   ├── models/
│   │   ├── usuário
│   │   ├── conversa
│   │   └── mensagem
│   ├── database/
│   │   ├── conexão
│   │   └── migrações
│   ├── middlewares/
│   │   ├── autenticação
│   │   └── validação de requisições
│   └── utils/
│       ├── registros de eventos
│       └── tratamento de erros
├── tests/
│   ├── chatbot
│   ├── integração
│   └── api
├── .env.example
├── README.md
└── arquivo de dependências do projeto
```

## 3. Componentes principais

### Integração com o WhatsApp

- Receber eventos e mensagens por webhook.
- Validar a origem das requisições.
- Enviar mensagens pela API escolhida.
- Tratar status de entrega, leitura e falhas de envio.

### API da aplicação

- Disponibilizar o endpoint do webhook.
- Validar e encaminhar eventos recebidos.
- Expor endpoints administrativos, se necessário.

### Núcleo do chatbot

- Interpretar a mensagem recebida.
- Identificar a intenção do usuário.
- Aplicar regras e etapas da conversa.
- Selecionar a resposta apropriada ou encaminhar para atendimento humano.

### Gerenciamento de conversas

- Associar mensagens ao usuário e à conversa.
- Manter o estado da conversa.
- Registrar histórico e contexto necessário.
- Encerrar ou reiniciar conversas conforme as regras definidas.

### Persistência de dados

- Usuários e identificadores do WhatsApp.
- Conversas e seus estados.
- Mensagens recebidas e enviadas.
- Configurações e eventos relevantes.

## 4. Fluxo básico de mensagens

1. O usuário envia uma mensagem pelo WhatsApp.
2. A plataforma do WhatsApp encaminha o evento ao webhook.
3. A API valida a requisição e extrai os dados da mensagem.
4. O gerenciamento de conversas localiza ou inicia a conversa.
5. O núcleo do chatbot interpreta a mensagem e determina a próxima ação.
6. A integração envia a resposta ao usuário.
7. A mensagem e o resultado do envio são registrados.

## 5. Fluxos auxiliares

- **Atendimento humano:** encaminhamento da conversa e pausa/resumo do atendimento automático.
- **Falhas:** registro do erro e estratégia de nova tentativa quando aplicável.
- **Mensagens não reconhecidas:** resposta de orientação ou encaminhamento para atendimento.
- **Privacidade:** controle de acesso, retenção e exclusão de dados conforme a política do serviço.

## 6. Configurações externas

- Credenciais e identificadores da integração com o WhatsApp.
- Endereço público do webhook.
- Configuração do banco de dados.
- Ambiente da aplicação e nível de registros.
- Chaves e segredos armazenados fora do código-fonte.

### Configurar o webhook da Meta

Defina as variáveis de ambiente `WHATSAPP_VERIFY_TOKEN` e `META_APP_SECRET`
no ambiente em que o servidor será executado. O token de verificação é uma
senha escolhida por você e deve ser igual à informada no painel da Meta; o
segredo do app é obtido nas configurações do app Meta e nunca deve ser
publicado no repositório.

O servidor expõe o webhook em `/api/webhook`:

- `GET /api/webhook` valida o token e devolve `hub.challenge`, usado pela Meta
  para verificar o endereço.
- `POST /api/webhook` confere `X-Hub-Signature-256` com o segredo do app e
  valida a estrutura do evento antes de encaminhá-lo ao controlador.
- `GET /api/status` informa se a API está ativa.

No painel do app Meta, informe a URL pública HTTPS do servidor seguida de
`/api/webhook`, use o mesmo token configurado em `WHATSAPP_VERIFY_TOKEN` e
inscreva o app no campo de webhook `messages`. A validação do webhook não
aprova automaticamente o app, o número ou o acesso de produção: essas etapas
precisam ser concluídas separadamente no painel da Meta.

## 7. Áreas de qualidade e operação

- Segurança e validação de webhooks.
- Monitoramento de disponibilidade e erros.
- Registro de eventos sem exposição desnecessária de dados pessoais.
- Testes unitários, de integração e do fluxo de conversa.
- Documentação de implantação e configuração.
