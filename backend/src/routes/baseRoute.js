const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');

function createBaseRouter(controller) {
  const router = express.Router();

  // Applica il middleware di autenticazione a tutte le route
  router.use(authenticate);

  router.get('/', (req, res) => controller.findAll(req, res));
  router.get('/:id', (req, res) => controller.findOne(req, res));
  router.post('/', (req, res) => controller.create(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));

  return router;
}

module.exports = createBaseRouter;