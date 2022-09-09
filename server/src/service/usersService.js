const {User, userJoiSchemaChangePassword} = require('../models/Users');
const ApiError = require('../exeptions/apiError')
const bcrypt = require('bcryptjs');

class UsersService {
    async getUsersProfileInfo(userId) {
        const user = await User.findById(userId, '-__v -password -updatedAt');
        return {user};
    }

    async deleteUsersProfile(userId) {
        await User.findByIdAndDelete(userId);
        return {message: 'Profile deleted successfully'};
    }

    async changeUsersPassword(oldPassword, newPassword, userId) {
        const user = await User.findById(userId);
        if (!await bcrypt.compare(String(oldPassword), String(user.password))) {
            throw ApiError.BadRequest('Invalid old password')
        }

        const {error} = await userJoiSchemaChangePassword.validate({password: newPassword});
        if (error) {
            throw ApiError.BadRequest('Invalid new password' + error.message)
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.save()

        return {message: 'Password changed successfully'};
    }
}

module.exports = new UsersService();