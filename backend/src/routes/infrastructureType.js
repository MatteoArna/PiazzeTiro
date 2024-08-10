const InfrastructureTypeController = require('../controllers/infrastructureTypeController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(InfrastructureTypeController);

router.post('/:id/targets/:targetId', InfrastructureTypeController.addAvailableTarget);
module.exports = router;