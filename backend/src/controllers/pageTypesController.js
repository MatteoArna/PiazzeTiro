const BaseController = require('./baseController');
const PageType = require('../models/pageType');

class PageTypesController extends BaseController {
    constructor() {
        super(PageType);
    }
}

module.exports = new PageTypesController();