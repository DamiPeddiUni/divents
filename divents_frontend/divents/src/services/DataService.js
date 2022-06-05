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
        return http.post('/api/v2/createEvent', details, {headers: {'authtoken': localStorage.getItem("userToken")}});
    }

    addReservation(id, data){
        return http.post('/api/v1/addReservation/' + id, data)
    }

    getUserTakingPart(id, auth_id){
        return http.get('/api/v2/getUserTakingPart/' + id, { params: { auth_id: auth_id }, headers: {'authtoken': localStorage.getItem("userToken")} })
    }

    checkReservation(id, data){
        return http.post('/api/v1/checkReservation/' + id, data)
    }

    isEventManager(id, auth_id){
        return http.get('/api/v1/isEventManager/' + id, { params: { auth_id: auth_id } })
    }

    deleteEvent(ids){
        return http.delete('/api/v2/deleteEvent/' + ids.id, {}, {headers: {'authtoken': localStorage.getItem("userToken")}})
    }

    getPartecipantsList(id){
        return http.get('/api/v1/getPartecipantsList/'+id)
    }
    getSubscriptionsEvents(id){
        return http.get('/api/v2/getSubscriptionsEvents/'+id)
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