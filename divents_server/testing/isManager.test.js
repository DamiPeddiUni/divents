require('dotenv').config()
const request = require("supertest")
const app = require("../app")
const jwt = require('jsonwebtoken');

describe("isEventManager testing", () => {
    var eventSpyFindById;

    beforeAll( async () => {
        jest.setTimeout(800000);
        const Event = require("../models/Event");
        eventSpyFindById = jest.spyOn(Event, 'findById').mockImplementation((id) => {
            if (id == 1){
                return {
                    id: "1",
                    author: "ey25d",
                    title: "Festa in malga",
                    brief_descr: "Divertimento in malga di notte",
                    detailed_descr: "Evento in malga con gnocchi, spezzatino di cervo e grappe per accompagnare",
                    requirements: "none",
                    key_words: ["malga", "grappa"],
                    location_name: "Località Bucaneve", 
                    address : "Via dei Pini 40",
                    latitude : "143.16302",
                    longitude : "143.16302",
                    date: new Date("2022-11-25"),
                    photos: [],
                    max_subscribers: 20,
                    subscribers: [],
                    partecipants: []
                };
            } else if (id == 2){
                return {
                    id: "2",
                    author: "gpqd6t",
                    title: "Mostra di Monet",
                    brief_descr: "Mostra alla Galleria degli Uffizi",
                    detailed_descr: "Sono esposte più di 250 opere per emozionare grandi e piccini",
                    requirements: "none",
                    key_words: ["arte", "Monet"],
                    location_name: "Galleria degli Uffizi", 
                    address : "Piazzale degli Uffizi 6, Firenze",
                    latitude : "173.16302",
                    longitude : "133.16302",
                    date: new Date("2022-10-21"),
                    photos: [],
                    max_subscribers: 20,
                    subscribers: [],
                    partecipants: []
                };
            }    
        })
    })

    afterAll( async () => {
        eventSpyFindById.mockRestore();
    })

    // token valido
    var token1 = jwt.sign(
        {auth_id: "qwerty3", user_id: "ey25d"},
        process.env.SUPER_SECRET,
        {expiresIn: 8000}
    )
    
    // token non valido
    var token2 = jwt.sign(
        {},
        process.env.SUPER_SECRET,
        {expiresIn: 8000}
    )

    // token valido ma che non combacia con il creatore dell'evento
    var token3 = jwt.sign(
        {auth_id: "qwerty3", user_id: "fh14r"},
        process.env.SUPER_SECRET,
        {expiresIn: 8000}
    )
    test("GET request at /api/v2/isEventManager/:id with not existent event ID", async () => {
        return request(app)
        .get("/api/v2/isEventManager/4")
        .set('authtoken', token1)
        .set('Accept', 'application/json')
        .expect(404)
        .then( (response) => {
            if (response.text){
                var data = JSON.parse(response.text);
                expect(data.isCreator).toEqual(false)
            }
        })
    })

    test("GET request at /api/v2/isEventManager/:id with valid event ID and right token", async () => {
        return request(app)
        .get("/api/v2/isEventManager/1")
        .set('authtoken', token1)
        .set('Accept', 'application/json')
        .expect(200)
        .then( (response) => {
            if (response.text){
                var data = JSON.parse(response.text);
                expect(data.isCreator).toEqual(true)
            }
        })
    })
    test("GET request at /api/v2/isEventManager/:id with unvalid token", async () => {
        return request(app)
        .get("/api/v2/isEventManager/1")
        .set('authtoken', token2)
        .set('Accept', 'application/json')
        .expect(403)
        .then( (response) => {
            if (response.text){
                var data = JSON.parse(response.text);
                expect(data.isCreator).toEqual(false)
            }
        })
    })
    test("GET request at /api/v2/isEventManager/:id with token of a user that is not the creator of the event", async () => {
        return request(app)
        .get("/api/v2/isEventManager/2")
        .set('authtoken', token3)
        .set('Accept', 'application/json')
        .expect(403)
        .then( (response) => {
            if (response.text){
                var data = JSON.parse(response.text);
                expect(data.isCreator).toEqual(false)
            }
        })
    })

})
