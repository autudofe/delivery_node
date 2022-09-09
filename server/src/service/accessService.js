const ApiError = require('../exeptions/apiError');

class AccessService {
    async driverAccess(role) {
        if (role !== 'DRIVER') {
            throw ApiError.BadRequest('This available only for DRIVER')
        }
    }

    async shipperAccess(role) {
        if (role !== 'SHIPPER') {
            throw ApiError.BadRequest('This available only for SHIPPER')
        }
    }

}

module.exports = new AccessService();