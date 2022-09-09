const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/forgot_password', authController.forgotPassword);


module.exports = {
    authRouter: router,
};
