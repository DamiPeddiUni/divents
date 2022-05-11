const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    date: { type: Date, required: true },
    photos: { type: Array, required: true },
    subscribers: { type: Array, required: true }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;