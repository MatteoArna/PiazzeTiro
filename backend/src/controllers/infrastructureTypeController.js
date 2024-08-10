const BaseController = require('./baseController');

const InfrastructureType = require('../models/InfrastructureType');

const TargetsForInfrastructure = require('../models/targetsForInfrastructure');
const HeadQuarter = require('../models/HeadQuarter');
const Target = require('../models/target');

class InfrastructureTypeController extends BaseController {
    constructor() {
        super(InfrastructureType);
    }

    findAll = async (req, res) => {
        try {
            const targets = await TargetsForInfrastructure.findAll({
                include: [
                    {
                        model: Target,
                        attributes: ['name']
                    }
                ]
            });

            targets.forEach((element) => {
                element.dataValues.target = element.Target.name;
            });

            const response = await this.model.findAll({
                include: [
                    {
                        model: HeadQuarter,
                        attributes: ['name']
                    }
                ]
            });

            response.forEach((element) => {
                element.dataValues.targets = targets.filter((target) => target.infrastructureTypeId === element.id);
            });
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    addAvailableTarget = async (req, res) => {
        try {
            const { id, targetId } = req.params;
            const response = await TargetsForInfrastructure.create({
                infrastructureTypeId: id,
                targetId
            });
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new InfrastructureTypeController();
