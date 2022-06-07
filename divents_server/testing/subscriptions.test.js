const request = require("supertest")
const app = require("../app")
const jwt = require('jsonwebtoken');
require('dotenv').config()

describe("Subscriptions test", () => {

    var eventSpy;
    var userSpy;

    beforeAll( () => {
        jest.setTimeout(80000);
        const Event = require("../models/Event");
        const Reservation = require("../models/Reservation")
        eventSpy = jest.spyOn(Event, 'findById').mockImplementation( (id) => {
            if (id==1){
                return {
                    id: 1,
                    author: "2",
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
            }else if(id==2){
                return {
                    id: 2,
                    author: "1",
                    title: "Festa in balcone",
                    brief_descr: "Bellissima festa in balcone",
                    detailed_descr: "Bellissima festa in balcone da passare in compagnia",
                    requirements: "Costume proibito",
                    key_words: ["balcone", "vicini", "festa"],
                    location_name: "Località balconcini", 
                    address : "Via terrazzetti 12",
                    latitude : "123.12312",
                    longitude : "123.12312",
                    date: new Date("2022-09-24"),
                    photos: [],
                    max_subscribers: 100,
                    subscribers: [1,3],
                    partecipants: []
                };
            }else{
                return null;
            }
            
        })
        userSpy = jest.spyOn(Reservation, "find").mockImplementation((id) =>{
            console.log("Ciao")
            console.log(id)
            if(id.user==1){
                return [1,2]
            }else if(id.user==2){
                return null
            }else if(id.user==3){
                return [1]

            }
        })
    })

    afterAll(async () => {
        eventSpy.mockRestore();
        userSpy.mockRestore();
    })
    
    var token = jwt.sign({
        auth_id: "1",
        user_id: "1"
    },
    process.env.SUPER_SECRET,
    {expiresIn: 80000})

    var invalid_token = jwt.sign({
        auth_id: "2",
        user_id: "2"
    },
    process.env.SUPER_SECRET,
    {expiresIn: 80000})

    test("A GET request at /api/v2/getSubscriptionsEvents with an id not in the DB", async () => {
        return request(app)
        .get('/api/v2/getSubscriptionsEvents')
        .set('authtoken', invalid_token)
        .expect(404)
    })

    test("A GET request at /api/v2/getSubscriptionsEvents with id in the DB must return an object of a single event", async () => {
        return request(app)
        .get('/api/v2/getSubscriptionsEvents')
        .set('authtoken',token)
        .expect(200)
    })
})