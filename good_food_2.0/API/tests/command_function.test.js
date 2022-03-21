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
        let commandMockedFind = await commandModel.findOne({body: commandMocked})
        await command.createCommand(reqOrigin,resTest)
        let dataTest = resTest._getJSONData()
        let statusTest = resTest._getStatusCode()
        expect(dataTest.message).toBe(`the command with number ${commandMockedFind._id} already exist`)
        expect(statusTest).toBe(400)
    })

    it('get a command normally', async () =>{
        let reqOrigin = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        await command.createCommand(reqOrigin,resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe(`command created`)
        expect(statusOrigin).toBe(201)
        let reqFind = httpMock.createRequest({body: commandMocked})
        let resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        let dataFind = resFind._getJSONData()
        let statusFind = resFind._getStatusCode()
        let date = new Date(dataFind.data.date)
        expect(dataFind.data.kind).toBe(commandMocked.kind)
        expect(dataFind.data.restaurant).toBe(commandMocked.restaurant)
        expect(dataFind.data.paymentMethod).toBe(commandMocked.paymentMethod)
        expect(date).toStrictEqual(commandMocked.date)
        expect(dataFind.data.products).toStrictEqual(commandMocked.products)
        expect(dataFind.data.price).toBe(commandMocked.price) 
        expect(dataFind.data.currency).toBe(commandMocked.currency) 
        expect(dataFind.data.state).toBe(commandMocked.state) 
        expect(statusFind).toBe(200)
    })

    it('get a command but field are missing', async () =>{
        //initiate test
        let reqOrigin = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        await command.createCommand(reqOrigin,resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe(`command created`)
        expect(statusOrigin).toBe(201)

        // test with kind = null
        commandMocked.kind = null
        let reqFind = httpMock.createRequest({body: commandMocked})
        let resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        let dataFind = resFind._getJSONData()
        let statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)

        // test with payments = null
        commandMocked.kind = "delivery"
        commandMocked.paymentMethod = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)

        // test with restaurant = null
        commandMocked.paymentMethod = "card"
        commandMocked.restaurant = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)
        
        // test with date = null
        commandMocked.restaurant = "Pizza Hut"
        commandMocked.date = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)
        
        // test with products = null
        commandMocked.date = new Date('March 18, 2022 18:58:00')
        commandMocked.products = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)
        
        // test with price = null
        commandMocked.products = ["reine","margarita","royal"]
        commandMocked.price = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)

        // test with currency = null
        commandMocked.price = 34
        commandMocked.currency = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)
        
        // test with state = null
        commandMocked.currency = "Euro"
        commandMocked.state = null
        reqFind = httpMock.createRequest({body: commandMocked})
        resFind = httpMock.createResponse()
        await command.getCommand(reqFind, resFind)
        dataFind = resFind._getJSONData()
        statusFind = resFind._getStatusCode()
        expect(dataFind.message).toBe(`at least one field are missing`)
        expect(statusFind).toBe(400)
        commandMocked.state = "delivered"     
    })

})