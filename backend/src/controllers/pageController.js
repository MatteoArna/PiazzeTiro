const BaseController = require('./baseController');
const Page = require('../models/page');
const PageType = require('../models/pageType');
const path = require('path');
const fs = require('fs');

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
    const newFile = req.file ? path.basename(req.file.path) : null;

    try {
      // Trova la pagina esistente
      const page = await Page.findByPk(req.params.id);
      if (!page) {
        return res.status(404).json({ message: 'Pagina non trovata' });
      }

      // Se esiste un nuovo file, elimina il vecchio file
      if (newFile && page.file) {
        const oldFilePath = path.join(__dirname, '../uploads', page.file);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Error deleting old file:', err);
          } else {
            console.log('Old file deleted:', oldFilePath);
          }
        });
      }

      // Aggiorna la pagina con i nuovi dati
      const updated = await Page.update(
        { summary, content, typeId, file: newFile || page.file },
        { where: { id: req.params.id } }
      );

      if (updated[0] > 0) { // Se l'aggiornamento ha avuto successo
        const updatedPage = await Page.findByPk(req.params.id);
        res.status(200).json(updatedPage);
      } else {
        res.status(500).json({ message: 'Errore nell\'aggiornamento della pagina' });
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

  delete = async (req, res) => {
    try {
      const page = await Page.findByPk(req.params.id);
      if (!page) {
        return res.status(404).json({ message: 'Pagina non trovata' });
      }

      const deleted = await Page.destroy({ where: { id: req.params.id } });

      if (deleted > 0) {
        const filePath = path.join(__dirname, '../uploads', page.file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted:', filePath);
          }
        });

        res.status(200).json({ message: 'Pagina eliminata con successo' });
      } else {
        res.status(500).json({ message: 'Errore nell\'eliminazione della pagina' });
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      res.status(500).json({ message: 'Errore nell\'eliminazione della pagina', error });
    }
  }
}

module.exports = new PageController();
