const User = require('./models/User')

function checkUserAuth (req, res) {
    User.findById(req.params.id)
    .then((result) => {
        res.send(result.profile_completed)
    })
    .catch((err) => {
        res.send(err)
    })
}

function registerUser (req, res) {
    res.send("registerUser")
}

module.exports = { checkUserAuth, registerUser }