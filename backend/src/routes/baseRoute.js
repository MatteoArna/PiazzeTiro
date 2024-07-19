const express = require('express');

function createBaseRouter(controller) {
  const router = express.Router();

  router.get('/', (req, res) => controller.findAll(req, res));
  router.get('/:id', (req, res) => controller.findOne(req, res));
  router.post('/', (req, res) => controller.create(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));

  return router;
}

module.exports = createBaseRouter;
