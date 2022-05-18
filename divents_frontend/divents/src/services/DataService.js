import http from '../http-common.js'

class DataService {
    getEvents(){
        return http.get('/api/v1/getEventsList');
    }
<<<<<<< HEAD
<<<<<<< HEAD

    getEventDetails(id) {
        return http.get('/api/v1/getEventDetails/'+id);
    }

    getUserDetails(id){
        return http.get('/api/v1/getUserDetails/'+id)
=======
    checkUserAuth(id){
        return http.get('/api/v1/checkUserAuth/' + id);
>>>>>>> f8e3c1f5d2565bc7da8774a545dd41016464aeb3
=======
    checkUserAuth(id){
        return http.get('/api/v1/checkUserAuth/' + id);
>>>>>>> f8e3c1f5d2565bc7da8774a545dd41016464aeb3
    }
}

export default new DataService();