import $api from "../http";

export default class LoadsService {

    static async getUsersLoads (){
        return $api.get('/loads', {})
    }

    static async addLoadForUser (data){
        return $api.post('/loads', {...data})
    }

    static async getUsersActiveLoad (){
        return $api.get('/loads/active', {})
    }

    static async iterateToNextLoadState (){
        return $api.patch('/loads/active/state', {})
    }

    static async getUsersLoadById (id){
        return $api.get(`/loads/${id}`, {})
    }

    static async updateUsersLoadById (id, data){
        return $api.put(`/loads/${id}`, {...data})
    }

    static async deleteUsersLoadById (id){
        return $api.delete(`/loads/${id}`, {})
    }

    static async postUsersLoadById (id){
        return $api.post(`/loads/${id}/post`, {})
    }

    static async getUsersLoadShippingInfoById (id){
        return $api.get(`/loads/${id}/shipping_info`, {})
    }

}