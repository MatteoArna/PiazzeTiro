const userController = require('../controllers/userController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(userController);

// Rotte GET aggiuntive
router.get('/role/:roleId', (req, res) => userController.getUserByRole(req, res));
router.get('/:email', (req, res) => userController.getUserById(req, res));
router.put('/nextStatus/:email', (req, res) => userController.setUserToNextStatus(req, res));

router.put('/changeRole/:email', (req, res) => userController.changeRole(req, res));

router.put('/approve/:email', (req, res) => userController.approveUser(req, res));
router.put('/removeApproval/:email', (req, res) => userController.removeApproval(req, res));
//router.get('/status/:status', (req, res) => userController.getUserByStatus(req, res));
module.exports = router;

