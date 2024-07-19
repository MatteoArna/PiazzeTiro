const User = require('../models/user');
const UserRole = require('../models/userRole');


//GET methods 
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: UserRole, attributes: ['role'] }]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
    }
};

exports.getUserByRole = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { roleId: req.params.roleId },
            include: [{ model: UserRole, attributes: ['role'] }]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.email, {
            include: [{ model: UserRole, attributes: ['role'] }]
        });
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recuperare l\'utente', error });
    }
};

exports.getUserByStatus = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { status: req.params.status },
            include: [{ model: UserRole, attributes: ['role'] }]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
    }
}

// POST methods
exports.createUser = async (req, res) => {
    try {
        const { email, firstName, lastName, roleId, society, status, password } = req.body;

        // Verifica se l'utente esiste già
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creazione dell'utente
        const user = await User.create({
            email,
            firstName,
            lastName,
            roleId,
            society,
            status,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// PUT methods
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        const { firstName, lastName, roleId, society, status, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.update({
            firstName,
            lastName,
            roleId,
            society,
            status,
            password: hashedPassword
        });
        res.status(200).json({ message: 'Utente aggiornato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'aggiornare l\'utente', error });
    }
};

exports.activateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        await user.update({ status: true });
        res.status(200).json({ message: 'Utente attivato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'attivare l\'utente', error });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        await user.update({ status: false });
        res.status(200).json({ message: 'Utente disattivato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel disattivare l\'utente', error });
    }
}

// DELETE methods
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        await user.destroy();
        res.status(200).json({ message: 'Utente eliminato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'eliminare l\'utente', error });
    }
};
