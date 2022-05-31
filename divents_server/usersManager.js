require('dotenv').config()

const User = require('./models/User')
const jwt = require('jsonwebtoken')


function checkUserAuth (req, res) { // dice se il profilo dell'utente è completo oppure no
    User.findOne({auth_id :req.params.id})
    .then((result) => {
        if (result){
            var response = {
                profile_completed: result.profile_completed
            }
            
            res.send(JSON.stringify(response))
        }else{
            var response = {
                profile_completed: false
            }
            res.send(JSON.stringify(response))
        }
        
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
}

function registerUser (req, res) { // inserisco i dati mancanti nel profilo dell'utente
    
    const user = new User({
        auth_id: req.body.auth_id,
        name : req.body.name,
        email : req.body.email,
        type : req.body.type,
        profile_photo : req.body.profile_photo,
        brief_presentation : req.body.brief_presentation,
        location : req.body.location,
        profile_completed : true
    })
    user.save()
    .then((result) => {
        if (result.length > 0){
            var response = {
                profile_completed: result.profile_completed
            }
            res.send(JSON.stringify(response))
        }else{
            var response = {
                profile_completed: false
            }
            res.send(JSON.stringify(response))
        }
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
    
}

function getUserDetails (req, res){ //cerco un profilo
    User.findById(req.params.id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send(err)
    })
}

function getIDFromAuthID(req, res){
    console.log("Hello World")
    console.log(req.params.id)
    //id = id.substring(1,id.length-1)
    User.findOne({auth_id : req.params.id})
    .then((result) => {
        console.log("findone")
        //console.log(resutl)
        if(result){
            res.send(result._id)
        }
        else{
            console.log("Result è null")
        }
    })
    .catch((err) => {
        console.log("Errore nella conversione dell'id")
    })
}

function generateToken(req, res){
    var payload = {auth_id: req.body.auth_id}
    var options = {expiresIn: 86400}
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options)
    console.log(token)
    res.send(JSON.stringify(token))
}
module.exports = { checkUserAuth, registerUser, getUserDetails, getIDFromAuthID, generateToken }