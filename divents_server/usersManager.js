const User = require('./models/User')

function checkUserAuth (req, res) { // dice se il profilo dell'utente è completo oppure no
    User.find({auth_id :req.params.id})
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
        res.send(err)
    })
}

function registerUser (req, res) { // inserisco i dati mancanti nel profilo dell'utente
    res.send("registerUser")
    User.findByIdAndUpdate(req.body.id, { 
        name : req.body.name, 
        type : req.body.type,
        profile_photo : req.body.profile_photo,
        brief_presentation : req.body.brief_presentation,
        location : req.body.location,
        profile_completed : true
    })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
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


module.exports = { checkUserAuth, registerUser, getUserDetails }