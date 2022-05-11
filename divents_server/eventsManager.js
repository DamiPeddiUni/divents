const Event = require('./models/Event')

function createEvent (req, res) {
    const event = new Event({
        author: "" + Math.random() * 1000000,
        title: "title" + Math.random() * 1000000,
        subtitle: "subtitle" + Math.random() * 1000000,
        date: new Date(),
        photos: [],
        subscribers: []
    })
    event.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err)
    })
}

function getEventsList (req, res) {
    Event.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send(err)
    })
}

function getEventDetails (req, res) {
    Event.findById(req.params.id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send(err)
    })
}

module.exports = { createEvent, getEventsList, getEventDetails }