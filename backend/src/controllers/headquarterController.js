const baseController = require('./baseController');
const Headquarter = require('../models/headQuarter');

class HeadquarterController extends baseController {
    constructor() {
        super(Headquarter);
    }
}

module.exports = new HeadquarterController();