class BaseController {
    constructor(model) {
      this.model = model;
    }
  
    // Metodo per creare una nuova istanza
    async create(req, res) {
      try {
        const item = await this.model.create(req.body);
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
  