import {makeAutoObservable} from 'mobx'
import LoadsService from "../services/LoadsService";


export default class LoadStore {
    loadData = [];
    activeLoad = {}
    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, {deep:true})
    }

    setActiveLoad(activeLoad) {
        this.activeLoad = activeLoad;
    }

    setLoadData(loadData) {
        this.loadData = loadData;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }


    async getUsersLoads() {
        this.setLoading(true);
        try {
            const response = await LoadsService.getUsersLoads();
            this.setLoadData(response.data.loads);
        }catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            this.setLoading(false);
        }
    }

    async getUsersActiveLoad() {
        this.setLoading(true);
        try {
            const response = await LoadsService.getUsersActiveLoad();
            this.setActiveLoad(response.data.load);
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }

    async iterateToNextLoadState() {
        this.setLoading(true);
        try {
            const response = await LoadsService.iterateToNextLoadState();
            const responseActiveLoad = await LoadsService.getUsersActiveLoad();
            this.setActiveLoad(responseActiveLoad.data.load);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }


    async addLoadForUser(data) {
        this.setLoading(true);
        try {
            const response = await LoadsService.addLoadForUser(data);
            const responseLoads = await LoadsService.getUsersLoads();
            this.setLoadData(responseLoads.data.loads);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }

    async updateUsersLoadById(data, id ) {
        console.log(data, id)
        this.setLoading(true);
        try {
            const response = await LoadsService.updateUsersLoadById(id, data);

                const responseLoads = await LoadsService.getUsersLoads();
                this.setLoadData(responseLoads.data.loads);


            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }

    async deleteUsersLoadById(id) {
        this.setLoading(true);
        try {
            const response = await LoadsService.deleteUsersLoadById(id);
            const responseLoads = await LoadsService.getUsersLoads();
            this.setLoadData(responseLoads.data.loads);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }

    async postUsersLoadById(id) {
        this.setLoading(true);
        try {
            const response = await LoadsService.postUsersLoadById(id);
            const responseLoads = await LoadsService.getUsersLoads();
            this.setLoadData(responseLoads.data.loads);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);

        }
    }

    async getUsersLoadShippingInfoById(id) {
        this.setLoading(true);
        try {
            const response = await LoadsService.getUsersLoadShippingInfoById(id);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }
}