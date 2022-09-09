const {Truck} = require('../models/Trucks');
const ApiError = require('../exeptions/apiError')

class TrucksService {

    async getUsersTrucks(userId) {
        let trucks = await Truck.find({}, '-__v -updatedAt');
        return {trucks};
    }

    async addTruckForUser(userId, type) {

        if (type !== 'SPRINTER' && type !== 'SMALL STRAIGHT' && type !== 'LARGE STRAIGHT') {
            throw ApiError.BadRequest('Type must be SPRINTER or SMALL STRAIGHT or LARGE STRAIGHT')
        }

        await Truck.create({created_by: userId, type});

        return {message: 'Truck created successfully'};
    }

    async getUsersTruckById(userId, id) {
        const truck = await Truck.findById({userId, _id: id}, '-__v -updatedAt');
        if (!truck) {
            throw ApiError.BadRequest('Truck not fount')
        }
        return {truck};
    }

    async updateUsersTruckById(userId, id, type) {
        if (type !== 'SPRINTER' && type !== 'SMALL STRAIGHT' && type !== 'LARGE STRAIGHT') {
            throw ApiError.BadRequest('Type must be SPRINTER or SMALL STRAIGHT or LARGE STRAIGHT')
        }

        const truck = await Truck.findById({userId, _id: id});

        truck.type = type;
        truck.save()

        return {message: 'Truck details changed successfully'};
    }

    async deleteUsersTruckById(userId, id) {
        const truck = await Truck.findByIdAndDelete({userId, _id: id})
        if (!truck) {
            throw ApiError.BadRequest('Truck not fount')
        }
        return {message: 'Truck deleted successfully'};
    }

    async assignTruckToUserById(userId, id) {

        const assignedTruck = await Truck.findOne({assigned_to: userId});

        console.log(assignedTruck)

        if (assignedTruck){
            if (assignedTruck.status === 'OL'){
                throw ApiError.BadRequest('You assign to another truck with status \'OL\'')
            }
        }

        const truck = await Truck.findById({userId, _id: id});

        if (!truck) {
            throw ApiError.BadRequest('Truck not fount')
        }

        if (truck.assigned_to !== null) {
            throw ApiError.BadRequest('Truck assign to another driver')
        }

        truck.assigned_to = userId;
         await truck.save()

        if (assignedTruck){
            assignedTruck.assigned_to = null;
            await assignedTruck.save()
            return {message: 'Truck assigned reassigned'};
        }

        return {message: 'Truck assigned successfully'};
    }

}

module.exports = new TrucksService();