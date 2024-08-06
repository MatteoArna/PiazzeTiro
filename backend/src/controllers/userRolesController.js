const BaseController = require('./baseController');
const UserRole = require('../models/userRole');

class UserRoleController extends BaseController{
    constructor(){
        super(UserRole);
    }
}

module.exports = new UserRoleController();