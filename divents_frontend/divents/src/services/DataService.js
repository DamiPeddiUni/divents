import http from '../http-common.js'

class DataService {
    getEvents(){
        return http.get('/api/v1/getEventsList');
    }
    checkUserAuth(id){
        return http.get('/api/v1/checkUserAuth/' + id);
    }
}

export default new DataService();