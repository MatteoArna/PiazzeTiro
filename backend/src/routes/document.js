const DocumentController = require('../controllers/documentController');
const createBaseRouter = require('./baseRoute');
const { uploadFile } = require('../middleware/fileMiddleware');

const router = createBaseRouter(DocumentController);

// Rotte GET aggiuntive
router.get('/user/:userId', (req, res) => DocumentController.getDocumentByUser(req, res));
router.get('/title/:title', (req, res) => DocumentController.getDocumentByTitle(req, res));

router.post('/create', uploadFile, (req, res) => DocumentController.create(req, res));


router.put('/update/:id', uploadFile, (req, res) => DocumentController.update(req, res));

module.exports = router;