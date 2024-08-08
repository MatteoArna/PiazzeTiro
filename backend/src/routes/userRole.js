const UserRoleController = require('../controllers/userRolesController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(UserRoleController);

module.exports = router;