import {makeAutoObservable} from 'mobx'
import TrucksService from "../services/TrucksService";


export default class TruckStore {
    truckData = [];

    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    setTruckData(truckData) {
        this.truckData = truckData;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }


    async getUsersTrucks() {
        this.setLoading(true);
        try {
            const response = await TrucksService.getUsersTrucks();
            this.setTruckData(response.data.trucks);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async addTruckForUser(data) {
        this.setLoading(true);
        try {
            const response = await TrucksService.addTruckForUser(data);
            const responseTrucks = await TrucksService.getUsersTrucks();
            this.setTruckData(responseTrucks.data.trucks);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    /*async getUsersTruckById(id) {
        this.setLoading(true);
        try {
            const response = await TrucksService.getUsersTruckById(id);
            return response;
        }catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        }finally {
            this.setLoading(false);
        }
    }*/

    async updateUsersTruckById(type, id) {
        this.setLoading(true);
        try {
            const response = await TrucksService.updateUsersTruckById(id, type);
            const responseTrucks = await TrucksService.getUsersTrucks();
            this.setTruckData(responseTrucks.data.trucks);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteUsersTruckById(id) {
        this.setLoading(true);
        try {
            const response = await TrucksService.deleteUsersTruckById(id);
            const responseTrucks = await TrucksService.getUsersTrucks();
            this.setTruckData(responseTrucks.data.trucks);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);
        }
    }

    async assignTruckToUserById(id) {
        this.setLoading(true);
        try {
            const response = await TrucksService.assignTruckToUserById(id);
            const responseTrucks = await TrucksService.getUsersTrucks();
            this.setTruckData(responseTrucks.data.trucks);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response;
        } finally {
            this.setLoading(false);

        }
    }


}