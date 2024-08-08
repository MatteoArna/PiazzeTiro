const BaseController = require('./baseController');
const Document = require('../models/document');
const User = require('../models/user');
const path = require('path');

class DocumentController extends BaseController {
  constructor() {
    super(Document);
  }

    // Metodo per creare un nuovo documento con upload di file
    create = async (req, res) => {
        const { userId } = req.body;
        const filePath = path.basename(req.file.path);

        try {
            const newDocument = await Document.create({ userId, filePath });
            res.status(201).json(newDocument);
        } catch (error) {
            res.status(500).json({ message: 'Errore nella creazione del documento', error });
        }
    };

    // Metodo per aggiornare un documento esistente con upload di file
    update = async (req, res) => {
        const { userId } = req.body;
        const filePath = path.basename(req.file.path);

        try {
            const document = await Document.findByPk(req.params.id);
            if (!document) {
                return res.status(404).json({ message: 'Documento non trovato' });
            }
            await document.update({ userId, filePath });
            res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ message: 'Errore nell\'aggiornamento del documento', error });
        }
    };

    // GET methods
    getDocumentByUser = async (req, res) => {
        try {
            const documents = await Document.findAll({
                where: { userId: req.params.userId },
                include: [{ model: User, attributes: ['email'] }]
            });
            res.status(200).json(documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
            res.status(500).json({ message: 'Errore nel recupero dei documenti', error });
        }
    };

    getDocumentByTitle = async (req, res) => {
        try {
            const documents = await Document.findAll({
                where: { title: req.params.title },
                include: [{ model: User, attributes: ['email'] }]
            });
            res.status(200).json(documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
            res.status(500).json({ message: 'Errore nel recupero dei documenti', error });
        }
    };


 
}

module.exports = new DocumentController();
