const TargetController = require('../controllers/targetController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(TargetController);

module.exports = router;