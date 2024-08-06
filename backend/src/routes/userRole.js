const UserRoleController = require('../controllers/userController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(UserRoleController);

module.exports = router;