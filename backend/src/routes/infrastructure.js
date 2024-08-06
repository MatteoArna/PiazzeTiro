const infrastructureController = require('../controllers/infrastructureController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(infrastructureController);

// Rotte GET aggiuntive
router.get('/type/:id', infrastructureController.findByType);


module.exports = router;