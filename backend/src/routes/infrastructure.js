const InfrastructureController = require('../controllers/infrastructureController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(InfrastructureController);

// Rotte GET aggiuntive
router.get('/status/:status', (req, res) => InfrastructureController.getInfrastructureByStatus(req, res));
router.get('/headquarter/:headQuarterId', (req, res) => InfrastructureController.getInfrastructureByHeadQuarter(req, res));

// Rotte PUT aggiuntive
router.put('/status/:id', (req, res) => InfrastructureController.updateStatus(req, res));


module.exports = router;