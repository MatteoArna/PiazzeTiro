const BaseController = require('./baseController');
const InfrastructureType = require('../models/InfrastructureType');

const HeadQuarter = require('../models/HeadQuarter');

class InfrastructureTypeController extends BaseController {
    constructor() {
        super(InfrastructureType);
    }

    findAll = async (req, res) => {
        try {
            const infrastructures = await this.model.findAll({
                include: {
                    association: 'HeadQuarter',
                    attributes: ['name']
                }
            });
            res.json(infrastructures);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new InfrastructureTypeController();
