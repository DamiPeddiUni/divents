import http from '../http-common.js'

class DataService {
    getEvents(){
        return http.get('/api/v1/getEventsList');
    }

    getEventDetails(id) {
        return http.get('/api/v1/getEventDetails/'+id);
    }

    getUserDetails(id){
        return http.get('/api/v1/getUserDetails/'+id)
    }
    
    checkUserAuth(id){
        return http.get('/api/v1/checkUserAuth/' + id);
    }

    registerUser(data){
        return http.post('/api/v1/registerUser', data);
    }
    
    createEvent(details){
        return http.post('/api/v1/createEvent', details);
    }
    addReservation(id, data){
        return http.post('/api/v1/addReservation/' + id, data)
    }
    getUserTakingPart(id, data){
        return http.post('/api/v1/getUserTakingPart/' + id, data)
    }
    checkReservation(id, data){
        return http.post('/api/v1/checkReservation/' + id, data)
    }
}

export default new DataService();