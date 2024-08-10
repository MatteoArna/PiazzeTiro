const baseController = require('./baseController');
const Booking = require('../models/booking');
const WeaponUsed = require('../models/weaponUsed');
const Weapon = require('../models/weapon');
const User = require('../models/user');
const Infrastructure = require('../models/infrastructure');
const InfrastructureType = require('../models/infrastructureType');
const HeadQuarter = require('../models/headQuarter');
const Target = require('../models/target');

class BookingController extends baseController {
    constructor() {
        super(Booking);
    }

    getBookingByInfrastructure = async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                where: { idInfrastructure: req.params.infrastructureId },
                include: [{ model: User, attributes: ['name', 'surname', 'email'] }]
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le prenotazioni', error });
        }
    };

    getBookingByUser = async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                where: { idCustomer: req.params.userId },
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName', 'email', 'society'] // Include la colonna society
                    },
                    {
                        model: Infrastructure,
                        attributes: ['name']
                    },
                    {
                        model: InfrastructureType,
                        attributes: ['id', 'type'],
                        include: [
                            {
                                model: HeadQuarter,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le prenotazioni', error });
        }
    };

    findAll = async (req, res) => {
        try {
            const bookings = await Booking.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName', 'email', 'society'] // Include la colonna society
                    },
                    {
                        model: Infrastructure,
                        attributes: ['name']
                    },
                    {
                        model: InfrastructureType,
                        attributes: ['id', 'type'],
                        include: [
                            {
                                model: HeadQuarter,
                                attributes: ['name']
                            }
                        ]
                    },
                    {
                        model: Target,
                        attributes: ['name', 'price']
                    }
                ]
            });

            if (!bookings || bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found' });
            }
    
            res.status(200).json(bookings);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Errore nel recuperare le prenotazioni', error });
        }
    };
    

    // GET methods
    


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
