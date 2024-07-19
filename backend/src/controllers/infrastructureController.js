const baseController = require('./baseController');
const Infrastructure = require('../models/infrastructure');
const InfrastructureStatus = require('../models/infrtastructureStatus');
const HeadQuarter = require('../models/headQuarter');

class InfrastructureController extends baseController {
    constructor() {
        super(Infrastructure);
    }

    // GET methods

    getInfrastructureByStatus = async (req, res) => {
        try {
            const infrastructures = await Infrastructure.findAll({
                where: { status: req.params.status },
                include: [{ model: InfrastructureStatus, attributes: ['status'] }]
            });
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

    // TODO: Implement infrastructures blocked

    // PUT methods

    updateStatus = async (req, res) => {
        try {
            const infrastructure = await Infrastructure.findByPk(req.params.id);
            if (!infrastructure) {
                return res.status(404).json({ message: 'Infrastruttura non trovata' });
            }
            await infrastructure.update({ status: req.body.status });
            res.status(200).json({ message: 'Stato infrastruttura aggiornato con successo' });
        } catch (error) {
            res.status(500).json({ message: 'Errore nell\'aggiornare lo stato dell\'infrastruttura', error });
        }
    }
}