/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")

/***********************************************/
/***** data base configuration during test *****/
/***********************************************/

/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await mockedDb.closeDatabase()})

describe('Test every path for franchise end-point', () => {

    let name = "McDO"
    let global_id

    it('test path put \"/franchise/\"', async ()=> {
        const res = await request(app)
                    .put('/franchise')
                    .send({
                        name
                    })

        global_id = (await request(app).get('/franchise/name/' + name).send()).body.data._id
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Franchise ${name} was created successfully`)
    })
    
    it('test path patch \"/franchise/:_id\"', async ()=> {
        const res = await request(app)
                    .patch('/franchise/' + global_id)
                    .send({
                        name: 'McDonald\'s',
                    })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Franchise was updated successfully`)
    })
    
    it('test path get \"franchise/name/:name\"', async () => {
        const res = await request(app)
                    .get('/franchise/name/' + name)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.found).toBe(true)
    })
    
    it('test path get \"/franchise/id/:_id\"', async () => {
        const res = await request(app)
                    .get('/franchise/id/' + global_id)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.found).toBe(true)
    })
    
    it('test path get \"/franchise/all\"', async () => {
        const res = await request(app)
                    .get('/franchise/all')
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(1)
    })

    it('test path delete \"/franchise/:_id\"', async ()=> {
        const res = await request(app)
                    .delete('/franchise/' + global_id)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Franchise was deleted successfully`)
    })
})