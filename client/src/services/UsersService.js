import $api from "../http";

export default class UsersService {

    static async getUsersProfileInfo (){
        return $api.get('/users/me')
    }

    static async deleteUsersProfile (){
        return $api.delete('/users/me', {})
    }

    static async changeUsersPassword (oldPassword, newPassword){
        return $api.patch('/users/me/password', {oldPassword, newPassword})
    }
}