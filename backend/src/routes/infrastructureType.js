const InfrastructureTypeController = require('../controllers/infrastructureTypeController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(InfrastructureTypeController);

module.exports = router;