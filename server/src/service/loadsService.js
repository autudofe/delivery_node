const mongoose = require('mongoose');
const {Load, LoadJoiSchemaAddLoad} = require('../models/Loads');
const {Truck} = require('../models/Trucks');
const ApiError = require('../exeptions/apiError')

class LoadsService {

    async getUsersLoadsDriver(userId, status, limit, offset) {
        limit = limit ? limit : 10;
        offset = offset ? offset : 0;

        const loads = await Load.aggregate([
            {
                '$match': {
                    '$or': [
                        {'status': 'ASSIGNED'},
                        {'status': 'SHIPPED'}
                    ]
                }
            },
            {'$skip': offset},
            {'$limit': limit}
        ])

        if (!loads) {
            throw ApiError.BadRequest('Load not fount')
        }

        return {loads}
    }

    async getUsersLoadsShipper(userId, status, limit, offset) {
        limit = limit ? limit : 10;
        offset = offset ? offset : 0;

        let sort = {
            '$or': [
                {'status': status}
            ]
        }

        status = status ? sort : '';

        const loads = await Load.aggregate([
            {'$match': {'created_by': mongoose.Types.ObjectId(userId)}},
            {'$match': {...status}},
            {'$skip': offset},
            {'$limit': limit}
        ])

        if (!loads) {
            throw ApiError.BadRequest('Load not fount')
        }

        return {loads}
    }

    async addLoadForUser(userId, data) {
        const {error} = await LoadJoiSchemaAddLoad.validate({...data});
        if (error) {
            throw ApiError.BadRequest('Invalid load data' + error.message)
        }

        await Load.create({created_by: userId, ...data});
        return {message: 'Load created successfully'};
    }

    async getUsersActiveLoad(userId) {

        const load = await Load.findOne({assigned_to: userId}, '-__v -updatedAt');
        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }

        return {load};
    }

    async iterateToNextLoadState(userId) {
        let load = await Load.findOne({assigned_to: userId});

        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }


        let newState = null;

        const loadStateArr = [
            'null',
            'En route to Pick Up',
            'Arrived to Pick Up',
            'En route to delivery',
            'Arrived to delivery'
        ];

        const index = loadStateArr.indexOf(load.state);


        if (index === -1 || index === loadStateArr.length - 1) {
            throw ApiError.BadRequest('Load state  can`t be changed')
        }
        newState = loadStateArr[index + 1]


        if (newState === loadStateArr[loadStateArr.length - 1]) {
            load.status = 'SHIPPED';

            await Truck.findOneAndUpdate({assigned_to: userId}, {$set: {status: 'IS', assigned_to: null}})
        }


        load.state = newState;

        load.logs = [
            ...load.logs,
            {
                message: 'Load state changed to ' + newState,
                time: new Date().toISOString()
            }
        ]

        await load.save()

        return {message: `Load state changed to '${newState}'`};
    }

    async getUsersLoadById(id) {
        const load = await Load.findById({_id: id}, '-__v -updatedAt');
        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }
        return {load};
    }

    async updateUsersLoadById(userId, id, data) {
        const {error} = await LoadJoiSchemaAddLoad.validate({...data});
        if (error) {
            throw ApiError.BadRequest('Invalid load data' + error.message)
        }


        let load = await Load.findOneAndUpdate({created_by: userId, _id: id, status: 'NEW'}, {$set: {...data}})
        if (!load) {
            throw ApiError.BadRequest('You can update only Load with status \'NEW\'')
        }


        return {message: 'Load details changed successfully'};
    }

    async deleteUsersLoadById(userId, id) {
        const load = await Load.findByIdAndDelete({created_by: userId, _id: id})
        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }

        return {message: 'Load deleted successfully'};
    }

    async postUsersLoadById(userId, id) {

        const truckTypes = {
            'SPRINTER': {width: 300, length: 250, height: 170, weight: 1700},
            'SMALL STRAIGHT': {width: 500, length: 250, height: 170, weight: 2500},
            'LARGE STRAIGHT': {width: 700, length: 350, height: 200, weight: 4000}
        }

        let load = await Load.findById({created_by: userId, _id: id});
        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }

        load.status = 'POSTED';
        await load.save();

        const {payload} = load;
        const {width, length, height} = load.dimensions;

        const {SPRINTER, 'SMALL STRAIGHT': SMALL_STRAIGHT, 'LARGE STRAIGHT': LARGE_STRAIGHT} = truckTypes;
        let type = null;

        if (SPRINTER.weight >= payload
            && SPRINTER.width >= width
            && SPRINTER.length >= length
            && SPRINTER.height >= height) {
            type = 'SPRINTER'
        } else if (SMALL_STRAIGHT.weight >= payload
            && SMALL_STRAIGHT.width >= width
            && SMALL_STRAIGHT.length >= length
            && SMALL_STRAIGHT.height >= height) {
            type = 'SMALL STRAIGHT'
        } else if (LARGE_STRAIGHT.weight >= payload
            && LARGE_STRAIGHT.width >= width
            && LARGE_STRAIGHT.length >= length
            && LARGE_STRAIGHT.height >= height) {
            type = 'LARGE STRAIGHT'
        }


        if (!type) {
            load.status = 'NEW';
            await load.save();
            return {
                message: "Load posted successfully",
                driver_found: false
            }
        }


        const trucks = await Truck.aggregate([
            {
                '$match': {
                    'assigned_to': {'$ne': null},
                    'status': 'IS',
                    'type': type
                }
            }, {'$limit': 1}
        ])


        if (trucks.length === 0) {
            load.status = 'NEW';
            await load.save();
            return {
                message: "Load posted successfully",
                driver_found: false
            }
        }
        const truck = trucks[0];

        await Truck.findByIdAndUpdate({_id: truck._id}, {$set: {status: 'OL'}})

        load.assigned_to = truck.assigned_to;
        load.status = 'ASSIGNED';
        load.state = 'En route to Pick Up';


        load.logs = [
            ...load.logs,
            {
                message: 'Load assigned to driver with id ' + truck.assigned_to,
                time: new Date().toISOString()
            }
        ]
        await load.save();


        return {
            message: "Load posted successfully",
            driver_found: true
        };
    }

    async getUsersLoadShippingInfoById(userId, id) {

        const load = await Load.findById({created_by: userId, _id: id}, '-__v -updatedAt');
        if (!load) {
            throw ApiError.BadRequest('Load not fount')
        }
        const truck = await Truck.findOne({assigned_to: load.assigned_to}, '-__v -updatedAt');
        if (!truck) {
            throw ApiError.BadRequest('Truck not fount')
        }

        return {
            load,
            truck
        };
    }
}

module.exports = new LoadsService();