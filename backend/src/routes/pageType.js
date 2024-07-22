const pageTypesController = require('../controllers/pageTypesController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(pageTypesController);

module.exports = router;