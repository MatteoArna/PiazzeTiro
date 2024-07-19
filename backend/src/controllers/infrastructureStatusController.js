const InfrastructureStatus = require('../models/infrastructureStatusModel');

//GET methods
exports.getAllInfrastructureStatus = async (req, res) => {
    try {
        const infrastructureStatus = await InfrastructureStatus.findAll();
        res.status(200).json(infrastructureStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving infrastructure status', error });
    }
};

exports.getInfrastructureStatusById = async (req, res) => {
    try {
        const infrastructureStatus = await InfrastructureStatus.findByPk(req.params.id);
        if (!infrastructureStatus) {
            return res.status(404).json({ message: 'Infrastructure status not found' });
        }
        res.status(200).json(infrastructureStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving infrastructure status', error });
    }
}

// POST methods
exports.createInfrastructureStatus = async (req, res) => {
    try {
        const { id, description } = req.body;

        const existingInfrastructureStatus = await InfrastructureStatus.findOne({ where: { id } });
        if (existingInfrastructureStatus) {
            return res.status(400).json({ message: 'Infrastructure status already exists' });
        }

        const infrastructureStatus = await InfrastructureStatus.create({
            id,
            description
        });

        res.status(201).json({ message: 'Infrastructure status created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// PUT methods

exports.updateInfrastructureStatus = async (req, res) => {
    try {
        const infrastructureStatus = await InfrastructureStatus.findByPk(req.params.id);
        if (!infrastructureStatus) {
            return res.status(404).json({ message: 'Infrastructure status not found' });
        }
        const { description } = req.body;
        await infrastructureStatus.update({
            description
        });
        res.status(200).json({ message: 'Infrastructure status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating infrastructure status', error });
    }
}

// DELETE methods

exports.deleteInfrastructureStatus = async (req, res) => {
    try {
        const infrastructureStatus = await InfrastructureStatus.findByPk(req.params.id);
        if (!infrastructureStatus) {
            return res.status(404).json({ message: 'Infrastructure status not found' });
        }
        await infrastructureStatus.destroy();
        res.status(200).json({ message: 'Infrastructure status deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting infrastructure status', error });
    }
}