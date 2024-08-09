const BaseController = require('./baseController');
const InfrastructureType = require('../models/InfrastructureType');

const HeadQuarter = require('../models/HeadQuarter');
const TargetsForInfrastructure = require('../models/targetsForInfrastructure');

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

    addAvailableTarget = async (req, res) => {
        try{
            const { infrastructureTypeId, targetId } = req.body;
            const targetForInfrastructure = await TargetsForInfrastructure.create({ infrastructureTypeId, targetId });
            res.json(targetForInfrastructure);
        }catch{
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new InfrastructureTypeController();
