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
    setNewEvent(details){
        http.post('url',details)
        .then(function(response){
            return "correct post"
        })
        .catch(function(error){
            return "error"
        });
    }
}

export default new DataService();