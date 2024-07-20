const BookingController = require('../controllers/bookingController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(BookingController);

// Rotte GET aggiuntive
router.get('/infrastructure/:infrastructureId', (req, res) => BookingController.getBookingByInfrastructure(req, res));
router.get('/user/:userId', (req, res) => BookingController.getBookingByUser(req, res));

module.exports = router;