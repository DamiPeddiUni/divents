const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var http = require('http');

const { getVersion } = require('./version.js')
const { checkUserAuth, registerUser } = require('./usersManager')
const { createEvent, getEventsList, getEventDetails } = require('./eventsManager')

const app = express();
app.use(cors())
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const DB_URI = "mongodb+srv://DamianoPedoni:Mongo1234@supercluster.cigtt.mongodb.net/diventsDB?retryWrites=true&w=majority"


console.log("Connecting to MongoDB Database...")
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("Connected to MongoDB Database")
    server.listen(PORT, () => {
        console.log("Server listening on port: " + PORT);
    })
})
.catch((err) => {
    console.log("Error connecting to MongoDB Datase: ")
    console.log(err)
})

/*

API:
- getEventsList (filters)
- checkUserAuth (id)
- registerUser (info)
- createEvent (info)
- getEventDetails (id)

*/

app.get('/api/v1/getVersion', (req, res) => {
    getVersion(req, res);
})

app.get('/api/v1/checkUserAuth/:id', (req, res) => {
    checkUserAuth(req, res);
})

app.get('/api/v1/registerUser', (req, res) => {
    registerUser(req, res);
})

app.get('/api/v1/createEvent', (req, res) => {
    createEvent(req, res);
})

app.get('/api/v1/getEventsList', (req, res) => {
    getEventsList(req, res);
})

app.get('/api/v1/getEventDetails/:id', (req, res) => {
    getEventDetails(req, res);
})

// Prova commmento