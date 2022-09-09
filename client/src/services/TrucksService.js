import $api from "../http";

export default class TrucksService {

    static async getUsersTrucks (){
        return $api.get('/trucks', {})
    }

    static async addTruckForUser (type){
        return $api.post('/trucks', {...type})
    }

    static async getUsersTruckById (id){
        return $api.get(`/trucks/${id}`, {})
    }

    static async updateUsersTruckById (id, type){
        return $api.put(`/trucks/${id}`, {...type})
    }

    static async deleteUsersTruckById (id){
        return $api.delete(`/trucks/${id}`, {})
    }

    static async assignTruckToUserById (id){
        return $api.post(`/trucks/${id}/assign`, {})
    }
}