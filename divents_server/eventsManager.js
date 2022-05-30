const Event = require('./models/Event')
const Reservation = require('./models/Reservation')
const User = require('./models/User')
const nodemailer = require('nodemailer')
require('dotenv').config();
var QRCode = require('qrcode')

function createEvent (req, res) {
    const event = new Event({
        author: req.body.author,
        title: req.body.title,
        brief_descr: req.body.brief_descr,
        detailed_descr: req.body.detailed_descr,
        requirements: req.body.requirements,
        key_words: req.body.key_words,
        location_name: req.body.location_name,
        address : req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        date : req.body.date,
        photos: req.body.photos,
        max_subscribers : req.body.max_subscribers,
        subscribers: [],
        partecipants: []
    })

    
    // da auth_id a id utente
    User.findOne({auth_id :req.body.author})
    .then((result) => {
        
        if(result){
            
            event.author=result._id
            console.log("Id creatore: " + result._id)
            event.save() // inserisco nel database
            .then((result) => {
                console.log("Inserito correttamente")
                res.send(result);
            })
            .catch((err) => {
                console.log("Errore riga 39")
                console.log(err)
            })
        }
        else{
            console.log("Id non trovato")
        }
    })
    .catch((err) => {
        console.log("Sono nel catch")
        console.log(err)
    })
}



function getEventsList (req, res) {  
    Event.find() // trova gli eventi nel db
    .limit(req.query.num_result)
    .then((result) => { // result è un array di eventi
        var dataOggi = new Date();
        var daRit = [];
        var length = result.length;
        for (var i = 0; i < length; i++) {
            // console.log(i)
            if (result[i].date >= dataOggi){
                daRit.push(result[i]);
            }
        }
        // console.log(daRit)
        res.send(JSON.stringify(daRit))
        
    })
    .catch((err) => {
        res.send(err)
    })
}

function getEventDetails (req, res) {
    Event.findById(req.params.id)
    .then((result) => {
        res.send(result) // ritorniamo il risultato
    })
    .catch((err) => {
        res.send(err)
    })
}

function addReservation (req, res) {

    User.findOne({auth_id :req.body.auth_id})
    .then((result) => {
        if (result){
            var reservationCode = Math.random() * 1000000
            var userID = result._id;
            var userEmail = result.email;

            // check se non esiste già una reservation uguale
            var userReservation = Reservation.findOne({
                user: userID,
                event: req.params.id,
            })
            .then((result) => {
                if (result == null){
                    const reservation = new Reservation({
                        user: userID,
                        event: req.params.id,
                        qrCode: reservationCode,
                    })
                    reservation.save() // inserisco nel database
                    .then((result) => {
                        sendEmail(userEmail, reservationCode)
                        addSubscriber(userID, req.params.id);
                        res.send("")
                    })
                    .catch((err) => {
                        //res.send(err)
                        console.log(err)
                    })
                }else{
                    console.log("User has already took part")
                }
            })
            

            
        }
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
}

// event : req.params.id, 
// qrCode : req.body.qrCode
function checkReservation (req, res) { //req.body.auth_id del creatore dell'evento
    // findOne trovo id di chi fa la richiesta
    // cerco id dell'utente che ha creato l'evento findbyid
    User.findOne({auth_id : req.body.auth_id})
    .then( (result) => {
        if (result){
            var user_id = result._id
            Event.findById(req.params.id)
            .then((result) => {
                if (result){
                    if (result.author == user_id){
                        // chi sta facendo la richiesta è il creatore dell'evento
                        Reservation.findOne({
                            event : req.params.id, 
                            qrCode : req.body.qrCode
                        })
                        .then( (result) => {
                            if (result){
                                // aggiungo user id alla lista di partecipanti
                                Event.findByIdAndUpdate(req.params.id,{$push : {partecipants : result.user}})
                                .then((result) => {
                                    var response = {
                                        success : true
                                    }
                                    res.send(JSON.stringify(response))
                                })
                                .catch( (err) => {
                                    console.log(err)
                                    res.send(JSON.stringify(err))
                                })
                            } else {
                                var response = {
                                    success : false
                                }
                                res.send(JSON.stringify(response))
                            }
                            
                        })
                        .catch( (err) => {
                            console.log(err)
                            res.send(JSON.stringify(err))
                        })
                    } else {
                        var response = {
                            success : false
                        }
                        res.send(JSON.stringify(response))
                    }
                }else{
                    var response = {
                        success : false
                    }
                    res.send(JSON.stringify(response))
                }
            })
            .catch( (err) => {
                console.log(err)
                res.send(JSON.stringify(err))
            })
        } else {
            var response = {
                success : false
            }
            res.send(JSON.stringify(response))

        }
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
    
}

function addSubscriber(userID, eventID){
    console.log("adding subscriber")
    Event.findOneAndUpdate(
        {_id: eventID},
        { $push: {subscribers: userID} }
    )
    .then((result) => {
        console.log(userID + " added successfully")
    })          
    .catch((err) => {
        console.log(err)
    })
}

async function sendEmail(userEmail, reservationCode){

    let img = await QRCode.toDataURL(reservationCode + "");
    

    console.log("sending email to " + userEmail + " with content: " + reservationCode)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: userEmail,
        subject: 'Divents reservation confirmation',
        attachDataUrls: true,
        html: '<h1>Thanks for your reservation.</h1><br><p>Here is your ticket!</p><br><img src="' + img +'">'
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error)
        }else{
            console.log("Email sent.")
        }
    })
}

function getUserTakingPart(req, res){
    var eventID = req.params.id;
    User.findOne({auth_id : req.query.auth_id})
    .then((result) => {
        if (result){
            var userID = result._id;

            var userReservation = Reservation.findOne({
                user: userID,
                event: req.params.id,
            })
            .then((result) => {
                var response = {
                    userTakePart: result != null,
                }
                res.send(JSON.stringify(response))
            })
            
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

// API 
function isEventManager(req, res){
    var eventID = req.params.id
    var userID = req.query.auth_id;
    
    Event.findById(eventID)
    .then((eventObj) => {
        if (eventObj){ // se trova l'evento di riferimento
            User.findOne({auth_id : userID})
            .then((userObj) => {
                if (userObj){ // se trova l'utente
                    if (userObj._id.toString() === eventObj.author){ // se il creatore dell'evento è l'utente che vuole eliminare l'evento
                        var response = {
                            isCreator : true
                        }
                        res.send(response)
                    }else{
                        var response = {
                            isCreator : false
                        }
                        res.send(response)
                    }
                    
                }else{ // se non trova l'utente
                    var response = {
                        isCreator : false
                    }
                    res.send(response) 
                }
            })
            .catch((err) => {
                console.log(err)
                var response = {
                    isCreator : false
                }
                res.send(response)
            })
        }else{
            var response = {
                isCreator : false
            }
            res.send(response)
        }
    })
    .catch((err) => {
        console.log(err)
        var response = {
            isCreator : false
        }
        res.send(response)
    })
}



//id Evento nei params, id User nel body
function deleteEvent(req, res){

    var eventID = req.params.id
    var userID = req.body.auth_id;

    Event.findById(eventID)
    .then((eventObj) => {
        if (eventObj){ // se trova l'evento di riferimento
            User.findOne({auth_id : userID})
            .then((userObj) => {
                if (userObj){ // se trova l'utente
                    if (userObj._id.toString() === eventObj.author){ // se il creatore dell'evento è l'utente che vuole eliminare l'evento
                        Event.findByIdAndDelete(req.params.id)
                        .then((eventObj) => {
                            var response = {
                                deleted : true
                            }
                            res.send(response)
                        })
                        .catch((err) => {
                            console.log(err)
                            var response = {
                                deleted : false
                            }
                            res.send(response)
                        })
                    }else{
                        var response = {
                            deleted : false
                        }
                        res.send(response)
                    }
                    
                }else{ // se non trova l'utente
                    var response = {
                        deleted : false
                    }
                    res.send(response) 
                }
            })
            .catch((err) => {
                console.log(err)
                var response = {
                    deleted : false
                }
                res.send(response)
            })
        }else{
            var response = {
                deleted : false
            }
            res.send(response)
        }
    })
    .catch((err) => {
        console.log(err)
        var response = {
            deleted : false
        }
        res.send(response)
    })
        
}

function getPartecipantsList(req, res){
    Event.findById(req.params.id)
    .then((result) => {
        if (result){
            var response = {
                partecipantsList : result.partecipants
            }
            res.send(response)
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function getEventDetailsByID(req, res){
    return new Promise(resolve => {
        Event.findById(req.params.id)
        .then((result) => {
            console.log(result)
            console.log("Rispondo con i dettagli di un evneto con id: "+req.params.id)
            res.send(JSON.stringify(result))
        })
        .catch((err) => {
            console.log("errore nella ricerca dell'id dell'evento")
            //res.send(err)
        })
    });
    
}


function getEventDetailsByID(req, res){
    return new Promise(resolve => {
        Event.findById(req.params.id)
        .then((result) => {
            console.log("Rispondo con i dettagli di un evneto con id: "+req.params.id)
            console.log(result)
            res.send(JSON.stringify(result))
        })
        .catch((err) => {
            console.log("errore nella ricerca dell'id dell'evento")
            //res.send(err)
        })
    });
    
}

function getSubscriptionsEvents(req, res){
    var events = []
    console.log("Chiamato getsubs")
    //convertire id
    console.log("L'id che poi passo è: "+req.params.id)
    /*getUserIDfromUserAuthID(req.params.id)
    .then(res =>{
        console.log("trovato il risultato per l'id:")
        console.log(res)
    })
    .catch(err => {
        console.log("Errore nel trovare l'id")
    })*/
    
    var id = req.params.id;
    console.log(id)
    id="6287ac050f5312c65a393257" //è un auth_id non un id utente
    Reservation.find({user : id})
    .then((result)=>{
        if(result.length>0)
        {
            for(var i=0; i<result.length; i++)
            {
                events[i]=result[i].event
            }
            res.send(JSON.stringify(events))
        }
        else{
            console.log("Restituito array vuoto");
        }
    })
    .catch((err) => {
        console.log("error")
        console.log(err)
    })
}

module.exports = { createEvent, getEventsList, getEventDetails, addReservation, checkReservation, getUserTakingPart, getSubscriptionsEvents, getEventDetailsByID, isEventManager, deleteEvent, getPartecipantsList }