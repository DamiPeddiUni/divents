const request = require("supertest")
const app = require("../app")

describe("Search testing", () => {

    var eventSpy;
    var eventSpyFindById;

    beforeAll( () => {
        const Event = require("../models/Event");
        eventSpy = jest.spyOn(Event, 'find').mockImplementation( (filters) => {
            if (filters && filters.title && filters.title['$regex'] == ".*piscina.*"){
                return [{
                    id: 1,
                    author: "Damiano Pedoni",
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
                }];
            }else{
                return [{
                    id: 0,
                    author: "Mastro fornaio",
                    title: "Una focaccia in compagnia",
                    brief_descr: "Un'occasione d'oro per mangiare una focaccia in compagnia",
                    detailed_descr: "Venite ad assaggiare la nostra focaccia",
                    requirements: "",
                    key_words: [],
                    location_name: "Focacceria",
                    address : "Via Limone 1",
                    latitude : "123.1231",
                    longitude : "123.1231",
                    date: new Date("2022-08-12"),
                    photos: [],
                    max_subscribers: 2,
                    subscribers: [],
                    partecipants: []
                },
                {
                    id: 1,
                    author: "Damiano Pedoni",
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
                }];
            }
            
        })
        eventSpyFindById = jest.spyOn(Event, 'findById').mockImplementation((id) => {
            if (id == 1){
                return {
                    id: 0,
                    title: "Evento 1"
                };
            }else{
                return {}
            }
            
        })
    })

    afterAll(async () => {
        eventSpy.mockRestore();
        eventSpyFindById.mockRestore();
    })

    test("A GET request at /api/v2/getEventsList without filters must return an array of events", async () => {
        return request(app)
        .get('/api/v2/getEventsList')
        .expect(200)
        .then( (res) => {
            if (res.text){
                var data = JSON.parse(res.text);
                expect(data.length).toEqual(2);
            }
        })
    })

    test("A GET request at /api/v2/getEventsList with filters must return an array of events", async () => {
        return request(app)
        .get('/api/v2/getEventsList?num_result=5&search_string=piscina&search_date=2022-09-17')
        .expect(200)
        .then( (res) => {
            if (res.text) {
                var data = JSON.parse(res.text);
                expect(data.length).toEqual(1);
                expect(data[0].id).toEqual(1)
            }
        })
    })
})

