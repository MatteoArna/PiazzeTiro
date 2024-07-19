const express = require('express');
const userController = require('../controllers/userController');
const createBaseRouter = require('./baseRoute');
const { authenticate } = require('../middleware/authMiddleware');

const router = createBaseRouter(userController);

// Rotte GET aggiuntive
router.get('/role/:roleId', authenticate, (req, res) => userController.getUserByRole(req, res));
router.get('/:email', authenticate, (req, res) => userController.getUserById(req, res));
router.get('/status/:status', authenticate, (req, res) => userController.getUserByStatus(req, res));

// Rotte PUT aggiuntive
router.put('/:email/activate', authenticate, (req, res) => userController.activateUser(req, res));
router.put('/:email/deactivate', authenticate, (req, res) => userController.deactivateUser(req, res));

// Applica il middleware di autenticazione a tutte le route
router.use(authenticate);

module.exports = router;
