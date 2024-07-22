const pageController = require('../controllers/pageController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(pageController);

// Rotte GET aggiuntive
router.get('/type/:typeId', (req, res) => PageController.getPageByType(req, res));

module.exports = router;