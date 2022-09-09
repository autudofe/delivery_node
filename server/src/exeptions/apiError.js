module.exports = class ApiError extends Error {
    status;

    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError(){
        return new ApiError(400, 'User not authorized')
    }

    static BadRequest(message){
        return new ApiError(400, message);
    }
}