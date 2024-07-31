const infrastructureController = require('../controllers/infrastructureController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(infrastructureController);

// Rotte GET aggiuntive
router.get('/headquarter/:headQuarterId', (req, res) => infrastructureController.getInfrastructureByHeadQuarter(req, res));


module.exports = router;