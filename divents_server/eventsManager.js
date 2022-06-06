const Event = require('./models/Event')
const Reservation = require('./models/Reservation')
const User = require('./models/User')
const nodemailer = require('nodemailer')
require('dotenv').config();
const jwt = require('jsonwebtoken')
var QRCode = require('qrcode')


function createEvent (req, res) {
    const event = new Event({
        author: req.user_id,
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

async function getEventsListWithPossibleFilters (req, res) {  
    
    
    var num_result = req.query.num_result;
    var search_string = req.query.search_string;

    var search_date = null;
    var end_date = null;
    
    var filters = {}

    

    if (search_string != null)
        if(search_string.trim().length > 0){
            filters.title = { $regex: '.*' + search_string + '.*'
        }
    }
    
    if (req.query.search_date){
        search_date = new Date(req.query.search_date);
        end_date = new Date(req.query.search_date + 'T23:59:59');
        filters.date = { $gte: search_date, $lte: end_date }
    }

    try{
        let result = await Event.find(filters, null, {limit: req.query.num_result});

        var dataOggi = new Date();
        var daRit = [];
        var length = result.length;
        for (var i = 0; i < length; i++) {
            // console.log(i)
            if (result[i].date >= dataOggi){
                daRit.push(result[i]);
            }
        }
        
        res.status(200).send(JSON.stringify(daRit))
    }catch(error){
        console.log(error)
        res.status(500);
    }
    

    /*
    Event.find(filters) // trova gli eventi nel db
    .then((result) => {
        console.log(result)
        res.status(200).send(JSON.stringify(result))
    })
    
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
        console.log(daRit)
        
        res.status(200).send(JSON.stringify(daRit))
        
    })
    .catch((err) => {
        res.send(JSON.stringify(err))
    })
    */
    
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

    User.findById(req.user_id)
    .then((result) => {
        if (result){
            var reservationCode = Math.random() * 1000000
            var userID = result._id;
            var userEmail = result.email;

            if (result.type == 1){
                res.status(403);
                return;
            }

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
                        res.status(200).send("")
                    })
                    .catch((err) => {
                        //res.send(err)
                        console.log(err)
                    })
                }else{
                    console.log("User has already took part")
                    res.status(400)
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
async function checkReservation (req, res) { //req.user_id creatore dell'evento
    // cerco id dell'utente che ha creato l'evento findbyid

    try{
        let event = await Event.findById(req.params.id)
        if (event){
            if (event.author == req.user_id){
                let reservation = await Reservation.findOne({event: req.params.id, qrCode: req.body.qrCode})
                if (reservation) {
                    let updated = await Event.findByIdAndUpdate(req.params.id,{$addToSet : {partecipants : reservation.user}})
                    if (updated){
                        var response = {
                            success : true
                        }
                        res.send(JSON.stringify(response))
                    }else{
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
            }else{
                var response = {
                    success : false
                }
                res.status(403).send(JSON.stringify(response))
            }
        }else{
            var response = {
                success : false
            }
            res.send(JSON.stringify(response))
        }

    }catch(error){
        //console.log(error)
        res.status(500);
    }
    
    /*

    Event.findById(req.params.id)
    .then((result) => {
        if (result){
            if (result.author == req.user_id){
                // chi sta facendo la richiesta è il creatore dell'evento
                Reservation.findOne({
                    event : req.params.id, 
                    qrCode : req.body.qrCode
                })
                .then( (result) => {
                    if (result){
                        // aggiungo user id alla lista di partecipanti
                        Event.findByIdAndUpdate(req.params.id,{$addToSet : {partecipants : result.user}})
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
    */          
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

function sendNotificationEmail(userEmail, text){

    //console.log("sending email to " + userEmail + " with content: " + text)
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
        subject: 'One event you are subscribed to has been modified!',
        attachDataUrls: true,
        html: text
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
    
    var userID = req.user_id;

    Reservation.findOne({
        user: userID,
        event: eventID,
    })
    .then((result) => {
        var response = {
            userTakePart: result != null,
        }
        res.send(JSON.stringify(response))
    })
        
}

// API 
async function isEventManager(req, res){
    var eventID = req.params.id
    try{
        let eventFound = await Event.findById(eventID)
        if (eventFound){
            if(req.user_id === eventFound.author){
                var response = {
                    isCreator : true
                }
                res.status(200).send(response)
            }else{
                var response = {
                    isCreator : false
                }
                res.status(200).send(response)
            }
        }else{
            var response = {
                isCreator : false
            }
            res.status(500).send(response)
        }
    }catch(err){
        console.log(err)
        var response = {
            isCreator : false
        }
        res.status(500).send(response)
    }
}




//id Evento nei params, id User nel body
function deleteEvent(req, res){
    var eventID = req.params.id
    var userID = req.user_id;

    Event.findById(eventID)
    .then((eventObj) => {
        if (eventObj){ // se trova l'evento di riferimento
            
            if (userID.toString() === eventObj.author){ // se il creatore dell'evento è l'utente che vuole eliminare l'evento
                notifySubscribers(eventID)
                Event.findByIdAndDelete(eventID)
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

async function getEventDetailsByID(id){
    id=id+""
    console.log(id)
    return await Event.findById(id);
    
}

function getSubscriptionsEvents(req, res){
    var events_complete = [];
    var events= [];
    Reservation.find({user : req.user_id})
    .then(async (result)=>{
        if(result.length>0)
        {
            //prendo gli id
            for(var i=0; i<result.length; i++)
            {
                events[i]=result[i].event
            }

            for(var i=0; i<events.length; i++)
            {
                var data = await getEventDetailsByID(events[i])
                
                
                if(data!=null)
                {
                    var eventData = {
                        _id: data._id,
                        photos: data.photos,
                        location: data.location,
                        date: data.date,
                        title: data.title,
                        brief_descr: data.brief_descr,
                        subscribers: data.subscribers,
                        reservationCode: result[i].qrCode,

                    }

                
                    events_complete.push(eventData)
                    
                }
            }
            
            res.send(JSON.stringify(events_complete))
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

async function notifySubscribers(eventID){
    try {
        const event = await Event.findById(eventID).exec();
        var title = event.title;
        var text = "<h1>We are sorry for this</h1><p>The event: "+title+" has been canceled.</p><p>Hoping to see you again!</p>"
        const reservations = await Reservation.find({event: eventID}).exec();
        for (var i = 0; i < reservations.length; i++){
            var userID = reservations[i].user;
            var user = await User.findById(userID).exec();
            var userEmail = user.email;
            sendNotificationEmail(userEmail, text)
        }
    }catch(error){
        console.log(error)
    }
    
}

module.exports = { createEvent, getEventsList, getEventDetails, addReservation, checkReservation, getUserTakingPart, getSubscriptionsEvents, getEventDetailsByID, isEventManager, deleteEvent, getPartecipantsList, getEventsListWithPossibleFilters }