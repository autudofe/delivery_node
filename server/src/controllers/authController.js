const authService = require('../service/authService');


class authController {
    async registerUser(req, res, next) {
        try {
            const {email, password, role} = req.body;
            const userData = await authService.registerUser(email, password, role)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async loginUser(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.loginUser(email, password)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const {email} = req.body;
            const userData = await authService.forgotPassword(email)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new authController();