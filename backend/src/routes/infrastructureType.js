const InfrastructureTypeController = require('../controllers/infrastructureTypeController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(InfrastructureTypeController);

router.put('/addAvailableTarget', InfrastructureTypeController.addAvailableTarget);

module.exports = router;