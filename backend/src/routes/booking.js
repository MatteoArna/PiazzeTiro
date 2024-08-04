const bookingController = require('../controllers/bookingController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(bookingController);

// Rotte GET aggiuntive
router.get('/infrastructure/:infrastructureId', (req, res) => bookingController.getBookingByInfrastructure(req, res));
router.get('/user/:userId', (req, res) => bookingController.getBookingByUser(req, res));

router.post('/addWeaponUsed', (req, res) => bookingController.addWeaponUsed(req, res));

module.exports = router;
