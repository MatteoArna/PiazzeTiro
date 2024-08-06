const baseController = require('./baseController');
const Infrastructure = require('../models/infrastructure');
const HeadQuarter = require('../models/headQuarter');
const InfrastructureType = require('../models/infrastructureType');

class InfrastructureController extends baseController {
    constructor() {
        super(Infrastructure);
    }

    findAll = async (req, res) => {
        try {
            const infrastructures = await Infrastructure.findAll({
                include: [
                    { model: HeadQuarter, attributes: ['name'] },
                    { model: InfrastructureType, attributes: ['type'] }   
                ]
            });

            if (!infrastructures || infrastructures.length === 0) {
                return res.status(404).json({ message: 'No infrastructures found' });
            }

            res.status(200).json(infrastructures);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le infrastrutture', error });
        }
    }

    getInfrastructureByHeadQuarter = async (req, res) => {
        try {
            const infrastructures = await Infrastructure.findAll({
                where: { headQuarterId: req.params.headQuarterId },
                include: [{ model: HeadQuarter, attributes: ['name'] }]
            });
            res.status(200).json(infrastructures);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le infrastrutture', error });
        }
    }
}

module.exports = new InfrastructureController();