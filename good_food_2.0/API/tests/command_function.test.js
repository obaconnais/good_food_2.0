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
    
    
    it('create a command normally',async() => {
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()    
        await command.createCommand(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`command created`)
        expect(status).toBe(201)
        let findCommand = await commandModel.findOne({commandMocked})
        expect(findCommand.kind).toBe(commandMocked.kind)
        expect(findCommand.restaurant).toBe(commandMocked.restaurant)
        expect(findCommand.paymentMethod).toBe(commandMocked.paymentMethod)
        expect(findCommand.date).toStrictEqual(commandMocked.date)
        expect(findCommand.products).toStrictEqual(commandMocked.products)
        expect(findCommand.price).toBe(commandMocked.price)
        expect(findCommand.currency).toBe(commandMocked.currency)
        expect(findCommand.state).toBe(commandMocked.state)
    })
    
    it('try to create a command but field kind is missing', async() => {
        commandMocked.kind = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.kind = "delivery"
    })

    it('try to create a command but one field restaurant is missing', async() => {
        commandMocked.restaurant = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.restaurant = "pizza hut"
    })

    it('try to create a command but one field paymentMethod is missing', async() => {
        commandMocked.paymentMethod = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.paymentMethod = "card"
    })

    it('try to create a command but one field date is missing', async() => {
        commandMocked.date = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.date = new Date('March 18, 2022 18:58:00')
    })

    it('try to create a command but one field price is missing', async() => {
        commandMocked.price = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.price = 34
    })

    it('try to create a command but one field currency is missing', async() => {
        commandMocked.currency = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.currency = "Euro"
    })

    it('try to create a command but one field state is missing', async() => {
        commandMocked.state = null
        let req = httpMock.createRequest({body:commandMocked})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.state = "Delivered"
    })

    it('try to create a command but all fields are missing', async() => {
        let req = httpMock.createRequest({body:{kind:null,restaurant:null,paymentMethod:null,date:null,products:null,price:null,currency:null,state:null}})
        let res = httpMock.createResponse()
        await command.createCommand(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
        commandMocked.state = "Delivered"
    })

    it('try to create a command but already exist', async () => {
        let reqOrigin = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        let resTest = httpMock.createResponse()
        await command.createCommand(reqOrigin, resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe("command created")
        expect(statusOrigin).toBe(201)
        let reqId = httpMock.createRequest({body: commandMocked})
        let resId = httpMock.createResponse()
        let id = await command.getCommandId(reqId, resId)
        console.log(id)
        await command.createCommand(reqOrigin,resTest)
        let dataTest = resTest._getJSONData()
        let statusTest = resTest._getStatusCode()
        expect(dataTest.message).toBe(`the command with number ${id}  already exist`)
        expect(statusTest).toBe(400)
    })
})