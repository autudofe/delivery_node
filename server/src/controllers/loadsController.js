const loadsService = require('../service/loadsService');
const {driverAccess, shipperAccess} = require('../service/accessService');

class loadsController {
    async getUsersLoads(req, res, next) {
        try {
            let {status, limit, offset} = req.query;
            const {userId, role} = req.user;
            if (role === 'DRIVER') {
                const loadData = await loadsService.getUsersLoadsDriver(userId, status, limit, offset)
                res.json(loadData);
            }
            if (role === 'SHIPPER') {
                const loadData = await loadsService.getUsersLoadsShipper(userId, status, limit, offset)
                res.json(loadData);
            }
        } catch (e) {
            next(e)
        }
    }

    async addLoadForUser(req, res, next) {
        try {
            const data = req.body;
            const {userId, role} = req.user;
            await shipperAccess(role);
            const loadData = await loadsService.addLoadForUser(userId, data)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async getUsersActiveLoad(req, res, next) {
        try {
            const {userId, role} = req.user;
            await driverAccess(role);
            const loadData = await loadsService.getUsersActiveLoad(userId)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async iterateToNextLoadState(req, res, next) {
        try {
            const {userId, role} = req.user;
            await driverAccess(role);
            const loadData = await loadsService.iterateToNextLoadState(userId)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async getUsersLoadById(req, res, next) {
        try {
            const {id} = req.params;
            const loadData = await loadsService.getUsersLoadById(id)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async updateUsersLoadById(req, res, next) {
        try {
            const data = req.body;
            const {id} = req.params;
            const {userId, role} = req.user;
            await shipperAccess(role);
            const loadData = await loadsService.updateUsersLoadById(userId, id, data)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async deleteUsersLoadById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await shipperAccess(role);
            const loadData = await loadsService.deleteUsersLoadById(userId, id)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async postUsersLoadById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await shipperAccess(role);
            const loadData = await loadsService.postUsersLoadById(userId, id)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }

    async getUsersLoadShippingInfoById(req, res, next) {
        try {
            const {id} = req.params;
            const {userId, role} = req.user;
            await shipperAccess(role);
            const loadData = await loadsService.getUsersLoadShippingInfoById(userId, id)
            res.json(loadData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new loadsController();