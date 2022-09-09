const express = require('express');
const router = express.Router();
const loadsController = require('../controllers/loadsController');
const {authMiddleware} = require('../middleware/authMiddleware');


router.get('/', authMiddleware, loadsController.getUsersLoads);

router.post('/', authMiddleware, loadsController.addLoadForUser);

router.get('/active', authMiddleware, loadsController.getUsersActiveLoad);

router.patch('/active/state', authMiddleware, loadsController.iterateToNextLoadState);

router.get('/:id', authMiddleware, loadsController.getUsersLoadById);

router.put('/:id', authMiddleware, loadsController.updateUsersLoadById);

router.delete('/:id', authMiddleware, loadsController.deleteUsersLoadById);

router.post('/:id/post', authMiddleware, loadsController.postUsersLoadById);

router.get('/:id/shipping_info', authMiddleware, loadsController.getUsersLoadShippingInfoById);


module.exports = {
    loadsRouter: router,
};
