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
        console.log('createDocument called');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        const { userId, fileType } = req.body;
        const filePath = req.file.path; // Ottieni il percorso del file dal middleware
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(req.file.path)}`;

        try {
        console.log('Creating new document with data:', { userId, fileType, filePath, fileUrl });
        const newDocument = await Document.create({ userId, fileType, filePath, fileUrl });
        res.status(201).json(newDocument);
        } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ message: 'Errore nella creazione del documento', error });
        }
    };

    // Metodo per aggiornare un documento esistente con upload di file
    update = async (req, res) => {
        console.log('updateDocument called');
        const { title, description, userId } = req.body;
        const filePath = req.filePath; // Ottieni il percorso del file dal middleware

        try {
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(filePath)}` : null;
            console.log('Updating document with data:', { title, description, userId, fileUrl });
            const [updated] = await Document.update(
                { title, description, userId, file: fileUrl },
                { where: { id: req.params.id } }
            );
            if (updated) {
                const updatedDocument = await Document.findByPk(req.params.id);
                res.status(200).json(updatedDocument);
            } else {
                res.status(404).json({ message: 'Documento non trovato' });
            }
        } catch (error) {
            console.error('Error updating document:', error);
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
