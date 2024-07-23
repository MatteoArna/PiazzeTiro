const BaseController = require('./baseController');
const Page = require('../models/page');
const PageType = require('../models/pageType');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Assicurarsi che la directory uploads esista
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurazione multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Directory dove salvare i file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nome del file
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite di 10MB
}).single('file');

class PageController extends BaseController {
    constructor() {
        super(Page);
    }

    // Metodo per creare una nuova pagina con upload di file
    create = async (req, res) => {
        console.log('createPageWithFile called');
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Errore nel caricamento del file', error: err });
            }

            const { summary, content, typeId } = req.body;
            const filePath = req.file ? req.file.path : '';

            try {
                console.log('Creating new page with data:', { summary, content, typeId, filePath });
                const newPage = await Page.create({ summary, content, typeId, file: filePath });
                res.status(201).json(newPage);
            } catch (error) {
                console.error('Error creating page:', error);
                res.status(500).json({ message: 'Errore nella creazione della pagina', error });
            }
        });
    };

    // Metodo per aggiornare una pagina esistente con upload di file
    update = async (req, res) => {
        console.log('updatePageWithFile called');
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Errore nel caricamento del file', error: err });
            }

            const { summary, content, typeId } = req.body;
            const filePath = req.file ? req.file.path : '';

            try {
                console.log('Updating page with data:', { summary, content, typeId, filePath });
                const updatedPage = await Page.update(
                    { summary, content, typeId, file: filePath },
                    { where: { id: req.params.id } }
                );
                res.status(200).json(updatedPage);
            } catch (error) {
                console.error('Error updating page:', error);
                res.status(500).json({ message: 'Errore nell\'aggiornamento della pagina', error });
            }
        });
    };

    //GET methods
    getPageByType = async (req, res) => {
        try {
            const pages = await Page.findAll({
                where: { typeId: req.params.typeId },
                include: [{ model: PageType, attributes: ['type'] }]
            });
            res.status(200).json(pages);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel recuperare le pagine', error });
        }
    }

    // Override del metodo findOne
  findOne = async (req, res) => {
    try {
      const page = await Page.findOne({
        where: { id: req.params.id },
        include: [{ model: PageType, attributes: ['type'] }]
      });

      if (!page) {
        return res.status(404).json({ message: 'Pagina non trovata' });
      }

      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ message: 'Errore nel recuperare la pagina', error });
    }
  };

  // Override del metodo findAll
  findAll = async (req, res) => {
    try {
      const pages = await Page.findAll({
        include: [{ model: PageType, attributes: ['type'] }]
      });

      res.status(200).json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Errore nel recuperare le pagine', error });
    }
  };
};

module.exports = new PageController();
