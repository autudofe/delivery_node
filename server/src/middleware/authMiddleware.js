const ApiError = require('../exeptions/apiError')
const tokenService = require('../service/tokenService');


const authMiddleware = async (req, res, next) => {

    try {
        const {authorization} = req.headers;
        console.log(authorization)
        if (!authorization){
            return next(ApiError.UnauthorizedError());
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateToken(token);
        if (!userData){
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();

    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};

module.exports = {
    authMiddleware,
};
