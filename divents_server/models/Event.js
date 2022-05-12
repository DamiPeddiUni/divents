const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    brief_descr: { type: String, required: true },
    detailed_descr: { type: String, required: true },
    requirements: { type: String, required: true},
    key_words: {type: Array, required: true},
    place: { type: String, required : true},
    date: { type: Date, required: true },
    photos: { type: Array, required: true },
    max_subscribers: { type: Number, required: true},
    subscribers: { type: Array, required: true },
    partecipants: { type: Array, require: true}
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;