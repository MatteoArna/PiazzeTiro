const express = require('express');
const router = express.Router();
const infrastructureStatusController = require('../controllers/infrastructureStatusController');
const { authenticate } = require('../middleware/authMiddleware');

// GET routes
router.get('/', authenticate, infrastructureStatusController.getAllInfrastructureStatus);
router.get('/:id', authenticate, infrastructureStatusController.getInfrastructureStatusById);

// POST routes
router.post('/', authenticate, infrastructureStatusController.createInfrastructureStatus);

// PUT routes
router.put('/:id', authenticate, infrastructureStatusController.updateInfrastructureStatus);

// DELETE routes
router.delete('/:id', authenticate, infrastructureStatusController.deleteInfrastructureStatus);


module.exports = router;
