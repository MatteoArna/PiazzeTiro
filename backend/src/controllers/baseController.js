const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

class BaseController {
    constructor(model) {
      this.model = model;

      //Configurazione e-mail
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'graciela.watsica@ethereal.email', 
            pass: 'WXwsCgvhFChSefKCuH' // Sostituisci con le tue credenziali Ethereal
        }
      });
    }
  
    // Metodo per creare una nuova istanza
    async create(req, res) {
      try {
        const item = await this.model.create(req.body);

        // Verifica se l'elemento creato è un booking, in base a un attributo specifico
        if (this.model.name === 'Booking') { // Supponendo che il modello si chiami 'Booking'
          // Configura l'email da inviare
          const mailOptions = {
              from: '"Booking Notification" <no-reply@example.com>', // Indirizzo fittizio
              to: req.body.idCustomer, // Assumendo che l'email dell'utente sia fornita nel body della richiesta
              subject: 'Conferma Prenotazione',
              text: `Grazie per aver effettuato una prenotazione! Il tuo booking ID è: ${item.id}`,
              html: `<b>Grazie per aver effettuato una prenotazione!</b><br>Il tuo booking ID è: ${item.id}`
          };

          // Invia l'email
          this.transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error('Errore durante l\'invio dell\'email:', error);
              } else {
                  console.log('Email inviata:', nodemailer.getTestMessageUrl(info));
              }
          });
        }

        res.status(201).json(item);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  
    // Metodo per trovare tutte le istanze
    async findAll(req, res) {
      try {
        const items = await this.model.findAll();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  
    // Metodo per trovare una singola istanza per ID
    async findOne(req, res) {
      try {
        const item = await this.model.findByPk(req.params.id);
        if (!item) {
          return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  
    // Metodo per aggiornare una singola istanza per ID
    async update(req, res) {
      try {
        const item = await this.model.findByPk(req.params.id);
        if (!item) {
          return res.status(404).json({ message: 'Not found' });
        }
        await item.update(req.body);
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  
    // Metodo per eliminare una singola istanza per ID
    async delete(req, res) {
      try {
        const item = await this.model.findByPk(req.params.id);
        if (!item) {
          return res.status(404).json({ message: 'Not found' });
        }
        await item.destroy();
        res.status(204).json({ message: 'Deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
      }
    }
  }
  
  module.exports = BaseController;
  