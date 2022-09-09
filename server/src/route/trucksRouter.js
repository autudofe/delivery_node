const express = require('express');
const router = express.Router();
trucksController = require('../controllers/trucksController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/',authMiddleware, trucksController.getUsersTrucks);

router.post('/',authMiddleware, trucksController.addTruckForUser);

router.get('/:id',authMiddleware, trucksController.getUsersTruckById);

router.put('/:id',authMiddleware, trucksController.updateUsersTruckById);

router.delete('/:id',authMiddleware, trucksController.deleteUsersTruckById);

router.post('/:id/assign',authMiddleware, trucksController.assignTruckToUserById);


module.exports = {
    trucksRouter: router,
};
