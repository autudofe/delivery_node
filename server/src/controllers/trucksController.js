const trucksService = require('../service/trucksService');
const accessService = require('../service/accessService');

class trucksController {
    async getUsersTrucks(req, res, next) {
        try {
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.getUsersTrucks(userId)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }

    async addTruckForUser(req, res, next) {
        try {
            const {type} = req.body;
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.addTruckForUser(userId, type)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }

    async getUsersTruckById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.getUsersTruckById(userId, id)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }

    async updateUsersTruckById(req, res, next) {
        try {
            const {id} = req.params;
            const {type} = req.body;
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.updateUsersTruckById(userId, id, type)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }

    async deleteUsersTruckById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.deleteUsersTruckById(userId, id)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }

    async assignTruckToUserById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await accessService.driverAccess(role);
            const truckData = await trucksService.assignTruckToUserById(userId, id)
            res.json(truckData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new trucksController();