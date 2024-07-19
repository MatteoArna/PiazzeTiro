const baseController = require('./baseController');
const User = require('../models/user');

class EstimateController extends baseController {
    constructor() {
        super(User);
    }

    // GET methods

    getEstimateByUser = async (req, res) => {
        try {
            const estimates = await User.findAll({
                where: { userId: req.params.userId },
                include: [{ model: Estimate, attributes: ['estimate'] }]
            });
            res.status(200).json(estimates);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare i preventivi', error });
        }
    }
}
