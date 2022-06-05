require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var http = require('http');
const jwt = require('jsonwebtoken')

// import funzioni da altri files
const { getVersion } = require('./version.js')
const { createEvent, getEventsList, getEventDetails, addReservation, checkReservation, getUserTakingPart, isEventManager, deleteEvent, getPartecipantsList, getSubscriptionsEvents, getEventDetailsByID, getEventsListWithPossibleFilters } = require('./eventsManager')
const { checkUserAuth, registerUser, getUserDetails, getIDFromAuthID, generateToken } = require('./usersManager')
const { tokenChecker } = require('./tokenChecker')

// inizializzo il server
const app = express();
app.use(express.json({limit: '50mb'}));
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
const server = http.createServer(app);

//const PORT = process.env.PORT || 3000;
//const DB_URI = "mongodb+srv://DamianoPedoni:Mongo1234@supercluster.cigtt.mongodb.net/diventsDB?retryWrites=true&w=majority"

// connessione al database
/*
console.log("Connecting to MongoDB Database...")
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to MongoDB Database")
    // connessione al server
    server.listen(PORT, () => {
        console.log("Server listening on port: " + PORT);
    })
})
.catch((err) => {
    console.log("Error connecting to MongoDB Datase: ")
    console.log(err)
})*/

app.get('/api/v1/getVersion', (req, res) => {
    getVersion(req, res);
})

app.get('/api/v1/checkUserAuth/:id', (req, res) => {
    checkUserAuth(req, res);
})

app.post('/api/v2/registerUser', (req, res) => {
    registerUser(req, res);
})

app.post('/api/v1/createEvent', (req, res) => {
    createEvent(req, res);
})

app.get('/api/v1/getEventsList', (req, res) => {
    getEventsList(req, res);
})

app.get('/api/v1/getEventDetails/:id', (req, res) => {
    getEventDetails(req, res);
})

app.post('/api/v1/addReservation/:id', (req, res) => {
    addReservation(req, res);
})

app.get('/api/v1/getUserDetails/:id', (req, res) =>{
    getUserDetails(req, res);
})

app.post('/api/v1/checkReservation/:id', tokenChecker, (req, res) => {
    checkReservation(req, res);
})

app.get('/api/v1/getUserTakingPart/:id', (req, res) => {
    getUserTakingPart(req, res);
})

app.get('/api/v1/isEventManager/:id', tokenChecker, (req, res) => {
    isEventManager(req, res);
})

app.delete('/api/v1/deleteEvent/:id', (req, res) => {
    deleteEvent(req, res);
})

app.get('/api/v1/getPartecipantsList/:id', (req, res) => {
    getPartecipantsList(req, res);
})

app.get('/api/v2/getSubscriptionsEvents/:id', (id, res) =>{
    getSubscriptionsEvents(id, res);
})

app.get('/api/v2/getEventDetailsByID/:id', (id,res) =>{
    getEventDetailsByID(id,res);
})

app.get('/api/v2/getIDFromAuthID/:id', (id,res) => {
    getIDFromAuthID(id,res);
})

app.get('/api/v2/getEventsList', (req, res) => {
    getEventsListWithPossibleFilters(req, res);
})

app.post('/api/v2/generateToken', (req, res) =>{
    generateToken(req, res);
})

module.exports = app
