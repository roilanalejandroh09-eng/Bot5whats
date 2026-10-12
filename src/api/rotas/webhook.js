const express = require("express");
const router = express.Router();
const webhookController = require("../controladores/webhookController");
const validarAssinatura = require("../../middlewares/validarAssinaturaWebhook");
const validarEvento = require("../../middlewares/validarEventoWebhook");

router.get("/webhook", webhookController.verificarWebhook);
router.post(
  "/webhook",
  validarAssinatura,
  validarEvento,
  webhookController.receberMensagem
);
router.get("/status", webhookController.status);

module.exports = router;
