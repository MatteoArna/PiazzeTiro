const HeadquarterController = require('../controllers/headquarterController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(HeadquarterController);

module.exports = router;