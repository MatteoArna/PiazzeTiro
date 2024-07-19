const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// Rotte GET
router.get('/', authenticate, userController.getAllUsers);
router.get('/role/:roleId', authenticate, userController.getUserByRole);
router.get('/:email', authenticate, userController.getUserById);
router.get('/status/:status', authenticate, userController.getUserByStatus);

// Rotte POST
router.post('/', authenticate, userController.createUser);

// Rotte PUT
router.put('/:email', authenticate, userController.updateUser);
router.put('/:email/activate', authenticate, userController.activateUser);
router.put('/:email/deactivate', authenticate, userController.deactivateUser);

// Rotta DELETE
router.delete('/:email', authenticate, userController.deleteUser);

module.exports = router;
