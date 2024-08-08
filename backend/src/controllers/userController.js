const BaseController = require('./baseController');
const User = require('../models/user');
const UserRole = require('../models/userRole');

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    findAll = async (req, res) => {
        try {
            const users = await User.findAll({
                include: [{ model: UserRole, attributes: ['role'] }]
            });
            res.status(200).json(users);
        }catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }                

    findOne = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.params.id },
                include: [{ model: UserRole, attributes: ['role'] }]
            });

            user.roleId = user.UserRole.role;

            res.status(200).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }

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
    
    setUserToNextStatus = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.params.email }
            });
            let newStatus = (user.status === 1) ? 4 : (user.status + 1);
            await user.update({ status: newStatus });
            res.status(200).json(user);
        }catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }

    changeRole = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.params.email }
            });
            await user.update({ roleId: req.body.roleId });
            res.status(200).json(user);
        }catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }

    approveUser = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.params.email }
            });
            await user.update({ status: 4 });
            res.status(200).json(user);
        }catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }

    removeApproval = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.params.email }
            });
            await user.update({ status: 0 });
            res.status(200).json(user);
        }catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare gli utenti', error });
        }
    }
}

module.exports = new UserController();