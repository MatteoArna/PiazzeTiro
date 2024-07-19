const EstimateController = require('../controllers/estimateController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(EstimateController);

// Rotte GET aggiuntive
router.get('/user/:userId', (req, res) => EstimateController.getEstimateByUser(req, res));

module.exports = router;