import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";


export default class AuthStore {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }


    async login(email, password) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.jwt_token);
            this.setAuth(true);

            const userResponse = await UsersService.getUsersProfileInfo();
            this.setUser(userResponse.data.user);

        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    async register(email, password, role) {
        this.setLoading(true);
        try {
            const response = await AuthService.register(email, password, role);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    async forgotPassword(email) {
        this.setLoading(true);
        try {
            const response = await AuthService.forgotPassword(email);
            return response.status === 200;
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async logout(email, password) {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }


    /*Users*/
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await UsersService.getUsersProfileInfo();
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteUsersProfile() {
        this.setLoading(true);
        try {
            const response = await UsersService.deleteUsersProfile();

            setTimeout(() => {
                this.setAuth(false);
                this.setUser({});
                localStorage.removeItem('token');
            }, 3000)
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    async changeUsersPassword(oldPassword, newPassword) {
        this.setLoading(true);
        try {
            const response = await UsersService.changeUsersPassword(oldPassword, newPassword);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

}