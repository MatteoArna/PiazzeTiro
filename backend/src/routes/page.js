const PageController = require('../controllers/pageController');
const createBaseRouter = require('./baseRoute');
const { uploadFile } = require('../middleware/fileMiddleware');

const router = createBaseRouter(PageController);

// Rotte GET aggiuntive
router.get('/type/:typeId', (req, res) => PageController.getPageByType(req, res));

router.post('/create', uploadFile, (req, res) => PageController.create(req, res));

router.put('/update/:id', uploadFile, (req, res) => PageController.update(req, res));

module.exports = router;
