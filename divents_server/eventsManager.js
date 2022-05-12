const Event = require('./models/Event')
const Reservation = require('./models/Reservation')
const User = require('./models/User')

function createEvent (req, res) {
    const event = new Event({
        author: "author" + Math.random() * 1000000,
        title: "title" + Math.random() * 1000000,
        subtitle: "subtitle" + Math.random() * 1000000,
        date: new Date(),
        photos: [],
        subscribers: []
    })
    event.save() // inserisco nel database
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
}

function getEventsList (req, res) {
    Event.find() // trova gli eventi nel db
    .then((result) => { // result è un array di eventi
        
        var dataOggi = new Date();
        var daRit = [];
        var length = result.length;
        for (var i = 0; i < length; i++) {
            console.log(i)
            if (result[i].date >= dataOggi){
                daRit.push(result[i]);
            }
        }
        console.log(daRit)
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

    const reservation = new Reservation({
        user: req.body.userId,
        event: req.params.id,
        qrCode: Math.random() * 1000000,
    })
    reservation.save() // inserisco nel database
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
}

module.exports = { createEvent, getEventsList, getEventDetails, addReservation }
//commento inutile
//altro commento nuovo