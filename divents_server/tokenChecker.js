require('dotenv').config()

const jwt = require('jsonwebtoken')

const tokenChecker = function(req, res, next) {
    var token = req.headers['authtoken'];
    if (!token){
        res.status(401).json({success: false, message: 'Nessun token trovato.'});
        return
    }
    jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
        if (err) {
            res.status(403).json({success: false, message: 'Token non valido.'});
        }else{
            req.auth_id = decoded.auth_id;
            req.user_id = decoded.user_id;
            next();
        }
    })
}

module.exports = {tokenChecker}