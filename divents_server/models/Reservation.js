const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    user: { type: String, required: true }, // id dell'utente
    event: { type: String, required: true }, // id dell'evento
    qrCode: { type: String, required: true },
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;