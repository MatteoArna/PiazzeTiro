const BaseController = require('./baseController');
const User = require('../models/user');
const UserRole = require('../models/userRole');

class userController extends BaseController {
    constructor() {
        super(User);
    }

    //GET methods 

    getUserByRole = async (req, res) => {
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

    getUserByStatus = async (req, res) => {
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

    // PUT methods

    activateUser = async (req, res) => {
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

    deactivateUser = async (req, res) => {
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
}