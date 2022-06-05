const request = require("supertest")
const app = require("../app")
const mongoose = require('mongoose');

describe("Register testing", () => {
    let conn;

    beforeAll( async () => {
        const User = require("../models/User");
        jest.setTimeout(80000);
        jest.unmock('mongoose');
        conn = await mongoose.connect("mongodb+srv://DamianoPedoni:Mongo1234@supercluster.cigtt.mongodb.net/diventsDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Database connected");    
    })
    afterAll( () => {
        mongoose.connection.close(true);
        console.log("Database connection closed");
    })

    test('POST con dati incompleti', async () => {
        return request(app)
        .post('/api/v2/registerUser')
        .set('Accept', 'application/json')
        .send({auth_id : '1', email: 'laura@gmail.com'})
        .expect(400)
    })

    test('POST con tipo errato', async () => {
        return request(app)
        .post('/api/v2/registerUser')
        .set('Accept', 'application/json')
        .send({auth_id : '1', name : 'laura', email: 'laura@gmail.com', type : 4, profile_photo : "foto", brief_presentation : "Girl"})
        .expect(400)
        
    })

    test('POST con tipo errato', async () => {
        return request(app)
        .post('/api/v2/registerUser')
        .set('Accept', 'application/json')
        .send({auth_id : '1', name : 'laura', email: 'laura@gmail.com', type : 1, profile_photo : "foto", brief_presentation : "Girl"})
        .expect(400)
        
    })

})