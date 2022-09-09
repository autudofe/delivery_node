import $api from "../http";

export default class AuthService {

    static async login (email, password){
        return $api.post('/auth/login', {email, password})
    }

    static async register (email, password, role){
        return $api.post('/auth/register', {email, password, role})
    }

    static async forgotPassword (email){
        return $api.post('/auth/forgot_password', {email})
    }
}