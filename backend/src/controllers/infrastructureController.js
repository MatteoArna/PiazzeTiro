const baseController = require('./baseController');
const Infrastructure = require('../models/infrastructure');

class InfrastructureController extends baseController {
    constructor() {
        super(Infrastructure);
    }

    findByType = async (req, res) => {
        try {
            const infrastructures = await this.model.findAll({
                where: {
                    typeId: req.params.id
                }
            });
            res.json(infrastructures);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new InfrastructureController();