const request = require("supertest")
const app = require("../app")

describe("Test generali", () => {

    var eventSpy;
    var eventSpyFindById;

    beforeAll( () => {
        const Event = require("../models/Event");
        eventSpy = jest.spyOn(Event, 'find').mockImplementation( (criterias) => {
            return [{
                id: 0,
                author: "aaaa",
                title: "aaaa",
                brief_descr: "aaaa",
                detailed_descr: "aaaa",
                requirements: "aaaa",
                key_words: [],
                location_name: "aaaa", // nome del luogo
                address : "aaaa",
                latitude : "aaaa",
                longitude : "aaaa",
                date: new Date(),
                photos: [],
                max_subscribers: 2,
                subscribers: [],
                partecipants: []
            }];
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

    test("Il modulo app deve essere definito", () => {
        expect(app).toBeDefined();
    })
    test("Una chiamata GET ad una API non definita deve restituire codice errore 404", () => {
        return request(app)
        .get('/api/v1/test')
        .expect(404)
    })
    test("Una chiamata GET ad una API definita deve restituire codice 200", () => {
        return request(app)
        .get('/api/v1/getVersion')
        .expect(200)
    })
    test("Chiamata GET a /api/v2/getEventsList deve restituire un array di eventi", async () => {
        return request(app)
        .get('/api/v2/getEventsList?num_result=5&search_string=a&search_date=2022-06-17')
        .expect(200)
    })
})

