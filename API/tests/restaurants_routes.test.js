/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")
const franchise = require("../model/franchise");
const restModel = require("../model/restaurant")
/***********************************************/
/***** data base configuration during test *****/
/***********************************************/


/**
 * before tests, connect to mockedDb and create a franchise 
 */
beforeAll(async () => {
    await mockedDb.connect()
    await franchise.create({ name: 'Mcdonald\'s France' })
})

/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await mockedDb.closeDatabase()})

describe('Test every path for restaurant end-point', () => {
    
    let name = "McDO"
    let address = {street:"14 rue du miam", postCode:"64000", city:"PAU", Country:"FRANCE"}
    let phone = "+33678912345"
    let mail = "mcdo@maim.fr"
    let franchiseName = 'Mcdonald\'s France'
    let schedule = {"mon":[{"begin": "9h00", "end": "18h00"}]}
    let global_id
    
    let nametwo = "Ronsard"
    let addresstwo = {street:"12 rue de la Paix", postCode:"64320", city:"PAU", Country:"FRANCE"}
    let phonetwo = "+33678342345"
    let mailtwo = "ronsard@maim.fr"

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

    it('test path post \"retaurant/zipCode/\"', async ()=> {
        let mockedRest = new restModel({
            name:nametwo,
            address:addresstwo,
            phone:phonetwo,
            mail:mailtwo,
            franchiseName:franchiseName,
            schedule:schedule
        })
        await restModel.create(mockedRest)
        const res = await request(app)
                    .post('/restaurant/zipCode/')
                    .send(
                        ["64000","64320"]
                    )
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(2)
    })

    it('test path delete \"/restaurant/:_id\"', async ()=> {
        const res = await request(app)
                    .delete('/restaurant/' + global_id)
                    .send()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`Restaurant was deleted successfully`)
    })

  
})
