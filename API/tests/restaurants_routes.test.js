/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")
const franchise = require("../model/franchise");
/***********************************************/
/***** data base configuration during test *****/
/***********************************************/


/**
 * before tests, create a franchise 
 */
beforeAll(async () => {
    await franchise.create({ name: 'Mcdonald\'s France' })
})

/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await mockedDb.closeDatabase()})

describe('Test every path for restaurant end-point', () => {
    
    let name = "McDO"
    let address = "14 rue du miam"
    let phone = "+33678912345"
    let mail = "mcdo@maim.fr"
    let franchiseName = 'Mcdonald\'s France'
    let schedule = {"mon":[{"begin": "9h00", "end": "18h00"}]}
    let global_id

    it('test path put \"/restaurant/\"', async ()=> {
        const res = await request(app)
                    .put('/restaurant')
                    .send({
                        name,
                        address,
                        phone,
                        mail,
                        franchiseName,
                        schedule
                    })

        global_id = (await request(app).get('/restaurant/mail/' + mail).send()).body.data._id
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Restaurant ${name} was created successfully`)
    })
    
    it('test path patch \"/restaurant/:_id\"', async ()=> {
        const res = await request(app)
                    .patch('/restaurant/' + global_id)
                    .send({
                        name: 'McDonald\'s',
                    })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Restaurant was updated successfully`)
    })
    
    it('test path get \"restaurant/name/:name\"', async () => {
        const res = await request(app)
                    .get('/restaurant/name/' + name)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.found).toBe(true)
    })
    
    it('test path get \"/restaurant/id/:_id\"', async () => {
        const res = await request(app)
                    .get('/restaurant/id/' + global_id)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.found).toBe(true)
    })
    
    it('test path get \"restaurant/mail/:mail\"', async () => {
        const res = await request(app)
                    .get('/restaurant/mail/' + mail)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.found).toBe(true)
    })
    
    it('test path get \"/restaurant/all\"', async () => {
        const res = await request(app)
                    .get('/restaurant/all')
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(1)
    })

    it('test path delete \"/restaurant/:_id\"', async ()=> {
        const res = await request(app)
                    .delete('/restaurant/' + global_id)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Restaurant was deleted successfully`)
    })
})