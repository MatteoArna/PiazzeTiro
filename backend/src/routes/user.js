const express = require('express');
const userController = require('../controllers/userController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(userController);

// Rotte GET aggiuntive
router.get('/role/:roleId', (req, res) => userController.getUserByRole(req, res));
router.get('/:email', (req, res) => userController.getUserById(req, res));
router.get('/status/:status', (req, res) => userController.getUserByStatus(req, res));

// Rotte PUT aggiuntive
router.put('/:email/activate', (req, res) => userController.activateUser(req, res));
router.put('/:email/deactivate', (req, res) => userController.deactivateUser(req, res));

module.exports = router;
