const BaseController = require('./baseController');
const InfrastructureType = require('../models/InfrastructureType');

class InfrastructureTypeController extends BaseController {
    constructor() {
        super(InfrastructureType);
    }
}

module.exports = new InfrastructureTypeController();