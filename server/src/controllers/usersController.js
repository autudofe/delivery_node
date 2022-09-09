const usersService = require('../service/usersService');

class usersController {
    async getUsersProfileInfo(req, res, next) {
        try {
            const {userId} = req.user;
            const userData = await usersService.getUsersProfileInfo(userId)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async deleteUsersProfile(req, res, next) {
        try {
            const {userId} = req.user;
            const userData = await usersService.deleteUsersProfile(userId)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async changeUsersPassword(req, res, next) {
        try {
            const {userId} = req.user;
            const {oldPassword, newPassword} = req.body;
            const userData = await usersService.changeUsersPassword(oldPassword, newPassword, userId)
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new usersController();