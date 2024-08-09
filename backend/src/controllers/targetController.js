const baseController = require('./baseController');
const Target = require('../models/target')

class TargetController extends baseController {
    constructor(){
        super(Target)
    }
}

module.exports = new TargetController();