const request = require("supertest")
const app = require("../app")
const jwt = require('jsonwebtoken')
require('dotenv').config()

describe("Reservation check testing", () => {

    var eventSpyFindByIdAndUpdate;
    var eventSpyFindById;
    var reservationSpyFindOne;

    beforeAll( () => {
        jest.setTimeout(8000);
        const Event = require("../models/Event");
        const Reservation = require("../models/Reservation")

        reservationSpyFindOne = jest.spyOn(Reservation, 'findOne').mockImplementation( (filters) => {
            if (filters && filters.event == "1" && filters.qrCode == "1234"){
                return {
                    user: "1",
                    event: "1",
                    qrCode: "1234"
                }
            }
        })
        eventSpyFindByIdAndUpdate = jest.spyOn(Event, 'findByIdAndUpdate').mockImplementation( (id) => {
            if (id == "1"){
                return {
                    id: 1,
                    author: "1",
                    title: "Festa in piscina",
                    brief_descr: "Bellissima festa in piscina",
                    detailed_descr: "Bellissima festa in piscina da passare in compagnia",
                    requirements: "Costume da bagno",
                    key_words: ["piscina", "festa"],
                    location_name: "Località paroline", 
                    address : "Via Piave 12",
                    latitude : "123.12312",
                    longitude : "123.12312",
                    date: new Date("2022-09-17"),
                    photos: [],
                    max_subscribers: 10,
                    subscribers: [],
                    partecipants: ["1"]
                }
            }
        })
        eventSpyFindById = jest.spyOn(Event, 'findById').mockImplementation((id) => {
            if (id == 1){
                return {
                    id: 1,
                    author: "1",
                    title: "Festa in piscina",
                    brief_descr: "Bellissima festa in piscina",
                    detailed_descr: "Bellissima festa in piscina da passare in compagnia",
                    requirements: "Costume da bagno",
                    key_words: ["piscina", "festa"],
                    location_name: "Località paroline", 
                    address : "Via Piave 12",
                    latitude : "123.12312",
                    longitude : "123.12312",
                    date: new Date("2022-09-17"),
                    photos: [],
                    max_subscribers: 10,
                    subscribers: [],
                    partecipants: []
                };
            }else{
                return {}
            }
            
        })
    })

    afterAll(async () => {
        eventSpyFindByIdAndUpdate.mockRestore();
        eventSpyFindById.mockRestore();
        reservationSpyFindOne.mockRestore();
    })

    var token = jwt.sign({
        auth_id: "1",
        user_id: "1"
    },
    process.env.SUPER_SECRET,
    {expiresIn: 8000})

    var invalid_token = jwt.sign({
        auth_id: "2",
        user_id: "2"
    },
    process.env.SUPER_SECRET,
    {expiresIn: 8000})

    test("A POST request at /api/v1/checkReservation with a valid code but an invalid authtoken must return an authorization error", async () => {
        return request(app)
        .post('/api/v2/checkReservation/1')
        .set('authtoken', invalid_token)
        .send({qrCode: "1234"})
        .expect(403)
    })

    test("A POST request at /api/v1/checkReservation with a valid code must return if the reservation is accepted or not", async () => {
        return request(app)
        .post('/api/v2/checkReservation/1')
        .set('authtoken', token)
        .send({qrCode: "1234"})
        .expect(200)
        .then( (res) => {
            
            if (res.text) {
                var data = JSON.parse(res.text);
                expect(data.success).toEqual(true);
            }
        })
    })
    test("A POST request at /api/v1/checkReservation with a not valid code must return if the reservation is accepted or not", async () => {
        return request(app)
        .post('/api/v2/checkReservation/1')
        .set('authtoken', token)
        .send({qrCode: "12345"})
        .expect(200)
        .then( (res) => {
            
            if (res.text) {
                var data = JSON.parse(res.text);
                expect(data.success).toEqual(false);
            }
        })
    })
})

