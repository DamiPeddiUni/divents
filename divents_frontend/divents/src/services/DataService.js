import http from '../http-common.js'

class DataService {
    getEvents(){
        return http.get('/api/v1/getEventsList');
    }

    getEventDetails(id) {
        return http.get('/api/v1/getEventDetails/'+id);
    }
}

export default new DataService();