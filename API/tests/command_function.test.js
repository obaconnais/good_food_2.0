const db = require("./db_handle")
const httpMock = require('node-mocks-http')
const command = require("../controler/command")
const commandModel = require("../model/command")

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

    it('get a command but field are missing', async () => {
        //initiate test
        let _id = null
        let reqOrigin = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        await command.createCommand(reqOrigin,resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe(`command created`)
        expect(statusOrigin).toBe(201)
        let reqGet = httpMock.createRequest({body: {_id: _id}})
        let resGet = httpMock.createResponse()
        await command.getCommand(reqGet, resGet)
        let dataGet = resGet._getJSONData()
        let statusGet = resGet._getStatusCode()
        expect(dataGet.message).toBe('at least one field are missing')
        expect(statusGet).toBe(400)
    })

    it('get a command but not found', async () => {
        let fakeCommand =  new commandModel({
            kind  : 'delivery', 
            restaurant : '\'auberge aux grive',
            paymentMethod : 'money', 
            date : new Date('March 18, 2022 18:58:00'),
            product : ['poire belle hélène', 'profiterolle', 'creme brulé'],
            price: 54, 
            currency: 'Livre',
            state: 'ready'
        })
        let req = httpMock.createRequest({body: fakeCommand})
        let res = httpMock.createResponse()
        await command.getCommand(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`command not found`)
        expect(status).toBe(400)
    })

    it('delete a command normally', async () => {
        let reqOrigin = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        await command.createCommand(reqOrigin,resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe(`command created`)
        expect(statusOrigin).toBe(201)
        let resFind = httpMock.createResponse()
        await command.getCommand(reqOrigin, resFind)
        let dataFind = resFind._getJSONData()
        let statusFind = resFind._getStatusCode()
        expect(dataFind.data.kind).toBe(commandMocked.kind)
        expect(dataFind.data.restaurant).toBe(commandMocked.restaurant)
        expect(dataFind.data.paymentMethod).toBe(commandMocked.paymentMethod)
        expect(new Date(dataFind.data.date)).toStrictEqual(commandMocked.date)
        expect(dataFind.data.products).toStrictEqual(commandMocked.products)        
        expect(dataFind.data.price).toBe(commandMocked.price)
        expect(dataFind.data.currency).toBe(commandMocked.currency)
        expect(dataFind.data.state).toBe(commandMocked.state)
        expect(statusFind).toBe(200)
        let reqDelete = httpMock.createRequest({body: {_id:dataFind.data._id}})
        let resDelete = httpMock.createResponse()
        await command.deleteCommand(reqDelete, resDelete)
        let dataDelete = resDelete._getJSONData()
        let statusDelete = resDelete._getStatusCode()
        expect(dataDelete.message).toBe(`command with id ${dataFind.data._id} deleted successfully`)
        expect(statusDelete).toBe(201)
    })

    it('set a command', async () => {
        let reqOrign = httpMock.createRequest({body: commandMocked})
        let resOrigin = httpMock.createResponse()
        await command.createCommand(reqOrign, resOrigin)
        let dataOrigin = resOrigin._getJSONData()
        let statusOrigin = resOrigin._getStatusCode()
        expect(dataOrigin.message).toBe(`command created`)
        expect(statusOrigin).toBe(201)
        let reqGetId = httpMock.createRequest({body: commandMocked})
        let resGetId = httpMock.createResponse()
        await command.getCommandId(reqGetId,resGetId)
        let dataGetId = resGetId._getJSONData()
        let statusGetId = resGetId._getStatusCode()
        expect(statusGetId).toBe(200)
        let reqGet = httpMock.createRequest({body: {_id: dataGetId}})
        let resGet = httpMock.createResponse()
        await command.getCommand(reqGet, resGet)
        let dataGet = resGet._getJSONData()
        let statusGet = resGet._getStatusCode()
        expect(statusGet).toBe(200)
        //test field kind
        dataGet.data.kind = "on premise"
        let reqSet = httpMock.createRequest({body: dataGet.data})
        let resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet )
        let dataSet = resSet._getJSONData()
        let statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        expect(statusSet).toBe(200)
        //rest field restaurant
        dataGet.data.restaurant = "You sushi"
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field paymentMethod
        dataGet.data.paymentMethod = "cash"
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field date
        dataGet.data.date = new Date("March 26, 2022 18:58:00")
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field products
        dataGet.data.products = ["sushi", "bol de soupe", "bière","glace"]
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field price
        dataGet.data.price = 50
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field currency
        dataGet.data.currency = 'Livre'
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        //rest field state
        dataGet.data.state = 'in progress'
        reqSet = httpMock.createRequest({body: dataGet.data})
        resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        dataSet = resSet._getJSONData()
        statusSet = resSet._getStatusCode()
        expect(dataSet).toBe('Command setted successfully')
        let reqIssue = httpMock.createRequest({body: dataGet.data})
        let resIssue = httpMock.createResponse()
        await command.getCommand(reqIssue, resIssue)
        let dataIssus = resIssue._getJSONData()
        let statusIssus = resIssue._getStatusCode()
        expect(statusIssus).toBe(200)
        expect(dataIssus.data.kind).toBe('on premise')
        expect(dataIssus.data.restaurant).toBe('You sushi')
        expect(dataIssus.data.paymentMethod).toBe('cash')
        expect(new Date(dataIssus.data.date).toString()).toBe(new Date("March 26, 2022 18:58:00").toString())
        expect(dataIssus.data.products).toStrictEqual(["sushi", "bol de soupe", "bière","glace"])
        expect(dataIssus.data.price).toBe(50)
        expect(dataIssus.data.currency).toBe("Livre")
        expect(dataIssus.data.state).toBe("in progress")
    })

    it('set a command but don\'t exist', async () => {
        let _id = "Efzfdaqzadcvg23"
        let commandNotExist = new commandModel({_id: _id, kind: "delivery", restaurant: "le mas des aromes", paymentMethod: "check", date: new Date("12/12/12"), product: ["salade caesar"], price: 23, currency: "Euro", state: "delivered"})
        let reqSet = httpMock.createRequest({body: commandNotExist})
        let resSet = httpMock.createResponse()
        await command.setCommand(reqSet, resSet)
        let dataSet = resSet._getJSONData()
        let statusSet = resSet._getStatusCode()
        expect(dataSet).toBe("command not found")
        expect(statusSet).toBe(400)
    })
})