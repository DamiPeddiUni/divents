const request = require("supertest")
const app = require("../app")

describe("Common tests", () => {

    test("App module must be defined", () => {
        expect(app).toBeDefined();
    })

    test("A GET call to a not defined API must return error code 404", () => {
        return request(app)
        .get('/api/v1/test')
        .expect(404)
    })
    test("A GET call to a defined API must return response code 200", () => {
        return request(app)
        .get('/api/v1/getVersion')
        .expect(200)
    })
})

