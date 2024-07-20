const baseController = require('./baseController');
const Booking = require('../models/booking');
const User = require('../models/user');
const Infrastructure = require('../models/infrastructure');

class BookingController extends baseController {
    constructor() {
        super(Booking);
    }

    //GET methods
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
};