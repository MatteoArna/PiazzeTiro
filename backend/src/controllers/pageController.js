const BaseController = require('./baseController');
const Page = require('../models/page');
const PageType = require('../models/pageType');
const path = require('path');

class PageController extends BaseController {
  constructor() {
    super(Page);
  }

  // Metodo per creare una nuova pagina con upload di file

  create = async (req, res) => {
    const { summary, content, typeId } = req.body;
    const file = path.basename(req.file.path);

    try {
      const newPage = await Page.create({ summary, content, typeId, file });
      res.status(201).json(newPage);
    } catch (error) {
      console.log('Error creating page:', error);
      res.status(500).json({ message: 'Errore nella creazione della pagina', error });
    }
  };

  // Metodo per aggiornare una pagina esistente con upload di file
  update = async (req, res) => {
    console.log('updatePage called');
    console.log('Request body:', req.body);
    const { summary, content, typeId } = req.body;
    const filePath = req.filePath; // Ottieni il percorso del file dal middleware

    try {
      const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(filePath)}` : null;
      console.log('Updating page with data:', { summary, content, typeId, fileUrl });
      const [updated] = await Page.update(
        { summary, content, typeId, file: fileUrl },
        { where: { id: req.params.id } }
      );
      if (updated) {
        const updatedPage = await Page.findByPk(req.params.id);
        res.status(200).json(updatedPage);
      } else {
        res.status(404).json({ message: 'Pagina non trovata' });
      }
    } catch (error) {
      console.error('Error updating page:', error);
      res.status(500).json({ message: 'Errore nell\'aggiornamento della pagina', error });
    }
  };

  // GET methods
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
  };

  // Override del metodo findOne
  findOne = async (req, res) => {
    try {
      const page = await Page.findOne({
        where: { id: req.params.id },
        include: [{ model: PageType, attributes: ['type'] }]
      });

      page.typeId = page.PageType.type;

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

      pages.forEach(page => {
        page.typeId = page.PageType.type;
      });

      res.status(200).json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Errore nel recuperare le pagine', error });
    }
  };
}

module.exports = new PageController();
