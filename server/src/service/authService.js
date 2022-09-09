const {User, userJoiSchemaRegister, userJoiSchemaLogin} = require('../models/Users');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const tokenService = require('./tokenService');
const ApiError = require('../exeptions/apiError')
const mailService = require('./mailService')


class AuthService {
    async registerUser(email, password, role) {

        const {error} = await userJoiSchemaRegister.validate({email, password, role});
        if (error) {
            throw ApiError.BadRequest(error.message)
        }

        const candidate = await User.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`User with email: '${email}' already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({email, password: hashPassword, role});
        return {message: 'Profile created successfully'}
    }

    async loginUser(email, password) {
        const {error} = await userJoiSchemaLogin.validate({email, password});
        if (error) {
            throw ApiError.BadRequest(error.message)
        }

        const user = await User.findOne({email});

        if (!user) {
            throw ApiError.BadRequest(`User with email: '${email}' not found`)
        }


        const isPassEquals = bcrypt.compareSync(String(password),
            String(user.password));

        if (!isPassEquals) {
            throw ApiError.BadRequest(`Password is not valid`)
        }

        const payload = {userId: user._id, role: user.role};
        const token = tokenService.generateTokens(payload)

        return {
            jwt_token: token,
        };
    }

    async forgotPassword(email) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`User with email: '${email}' not found`)
        }

        const newPassword = generator.generate({
            length: 10,
            numbers: true
        });

        await mailService.sendMailWithNewPassword(email, newPassword);

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save()

        return {
            message: "New password sent to your email address"
        };
    }

}

module.exports = new AuthService();