const request = require("supertest")
const app = require("../app")

describe("Search testing", () => {

    var eventSpy;

    beforeAll( () => {
        jest.setTimeout(8000);
        const Event = require("../models/Event");
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
            }else{
                return null;
            }
            
        })
    })

    afterAll(async () => {
        eventSpy.mockRestore();
    })

    test("A GET request at /api/v1/getEventDetails with an id not in the DB", async () => {
        return request(app)
        .get('/api/v1/getEventDetails/')
        .expect(404)
    })

    test("A GET request at /api/v1/getEventDetails with id in the DB must return an object of a single event", async () => {
        return request(app)
        .get('/api/v1/getEventDetails/1')
        .expect(200)
    })
})