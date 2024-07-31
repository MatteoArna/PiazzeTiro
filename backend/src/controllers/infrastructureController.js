const baseController = require('./baseController');
const Infrastructure = require('../models/infrastructure');
const HeadQuarter = require('../models/headQuarter');

class InfrastructureController extends baseController {
    constructor() {
        super(Infrastructure);
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