import http from '../http-common.js'

class DataService {
    getEvents(num){
        return http.get('/api/v1/getEventsList', { params: { num_result: num } });
    }

    getEventsListWithPossibleFilters(data){
        return http.get('/api/v2/getEventsList', {params: data})
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
        return http.post('/api/v2/registerUser', data);
    }
    
    createEvent(details){
        return http.post('/api/v1/createEvent', details);
    }

    addReservation(id){
        return http.post('/api/v2/addReservation/' + id, {}, { headers: { "authtoken": localStorage.getItem('userToken')}});
    }

    getUserTakingPart(id, auth_id){
        return http.get('/api/v1/getUserTakingPart/' + id, { params: { auth_id: auth_id } })
    }

    checkReservation(id, data){
        return http.post('/api/v2/checkReservation/' + id, data, { headers: { "authtoken": localStorage.getItem('userToken')}})
    }

    isEventManager(id){
        return http.get('/api/v2/isEventManager/' + id, { headers: { "authtoken": localStorage.getItem('userToken')}});
    }

    deleteEvent(ids){
        return http.delete('/api/v1/deleteEvent/' + ids.id, { data: { id: ids.id, auth: ids.auth_id } })
    }

    getPartecipantsList(id){
        return http.get('/api/v1/getPartecipantsList/'+id)
    }
    getSubscriptionsEvents(){
        return http.get('/api/v2/getSubscriptionsEvents', { headers: { "authtoken": localStorage.getItem('userToken')}})
    }

    getEventDetailsByID(id){
        return http.get('/api/v2/getEventDetailsByID/'+id)
    }

    getIDFromAuthID(id){
        return http.get('/api/v2/getIDFromAuthID/'+id)
    }
    
    generateToken(data){
        return http.post('/api/v2/generateToken', data)
    }
}

export default new DataService();