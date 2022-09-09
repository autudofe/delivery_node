const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/',authMiddleware, usersController.getUsersProfileInfo);

router.delete('/',authMiddleware, usersController.deleteUsersProfile);

router.patch('/password',authMiddleware, usersController.changeUsersPassword);


module.exports = {
  usersRouter: router,
};
