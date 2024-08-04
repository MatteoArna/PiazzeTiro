const baseController = require('./baseController');
const Booking = require('../models/booking');
const WeaponUsed = require('../models/weaponUsed');
const Weapon = require('../models/weapon');
const User = require('../models/user');
const Infrastructure = require('../models/infrastructure');

class BookingController extends baseController {
    constructor() {
        super(Booking);
    }

    // GET methods
    getBookingByInfrastructure = async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                where: { infrastructureId: req.params.infrastructureId },
                include: [{ model: User, attributes: ['name', 'surname', 'email'] }]
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le prenotazioni', error });
        }
    }

    getBookingByUser = async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                where: { userId: req.params.userId },
                include: [{ model: Infrastructure, attributes: ['name'] }]
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le prenotazioni', error });
        }
    }

    addWeaponUsed = async (req, res) => {
        const { bookingId, weaponId } = req.body;

        if (!bookingId || !weaponId) {
            return res.status(400).json({ message: 'Booking ID and Weapon ID are required' });
        }

        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            const weapon = await Weapon.findByPk(weaponId);
            if (!weapon) {
                return res.status(404).json({ message: 'Weapon not found' });
            }

            const weaponUsed = await WeaponUsed.create({ bookingId, weaponId });
            res.status(201).json(weaponUsed);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

module.exports = new BookingController();
