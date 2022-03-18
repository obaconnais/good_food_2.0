const db = require("./db_handle")
const httpMock = require('node-mocks-http')
const command = require("../controller/command")
const commandModel = require("../model/commmand")
/**
 * before each test, connect to the mocked database
 */
beforeAll(async () => {await db.connect()})
/**
 * after each test,clear all date which present in the mocked database
 */
afterEach(async () => {await db.clearDatabase()})
/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await db.closeDatabase()})

describe('mongodb command response and connexion', ()=>{
    let commandMocked = new commandModel({
        kind: "delivery",
        restaurant: "pizza hut",
        paymentMethod: "Card",
        date: new Date('March 18, 2022 18:58:00'), 
        products: ["reine","margarita","royal"],
        price: 34,
        currency: "Euro",
        state:'delivered'
    })


    it('create a command',async()=>{
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()    
        await command.createCommand(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`command created`)
        expect(status).toBe(201)
    })
})