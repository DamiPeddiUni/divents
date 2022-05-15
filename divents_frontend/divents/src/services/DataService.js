import http from '../http-common.js'

class DataService {
    getEvents(){
        return http.get('/api/v1/getEventsList');
    }
}

export default new DataService();