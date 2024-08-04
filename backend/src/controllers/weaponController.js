const baseController = require('./baseController');
const Weapon = require('../models/weapon');

class WeaponController extends baseController {
    constructor() {
        super(Weapon);
    }
}

module.exports = WeaponController;