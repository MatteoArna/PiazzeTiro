const WeaponController = require('../controllers/weaponController');
const createBaseRouter = require('./baseRoute');

const router = createBaseRouter(WeaponController);

module.exports = router;