const BaseController = require('./baseController');
const Page = require('../models/page');
const PageType = require('../models/pageType');

class PageController extends BaseController {
    constructor() {
        super(Page);
    }

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


};

module.exports = new PageController();
