const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secretKey, {expiresIn: '1d'});
        return accessToken;
    }

    validateToken(token) {
        try {
            const userData = jwt.verify(token, secretKey);
            return userData;
        } catch (e) {
            return null;
        }
    }

}

module.exports = new TokenService();