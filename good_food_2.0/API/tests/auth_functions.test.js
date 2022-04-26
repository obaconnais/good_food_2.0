const user = require('../model/user')
const db = require("./db_handle")
const httpMock = require('node-mocks-http')
const authControler = require('../controler/auth')
/**
 * before each test, connect to the mocked database
 */
beforeAll(async () => {
    //mocked dataBase
    await db.connect()
})
/** 
 * before each test, create a mocked user in the data base 
*/
beforeEach(async()=>{
    let authMocked = new user({
        lastname: "François-Marie", 
        forname: "Arouet", 
        mail: "fm.voltaire@test.com",
        address: "2 rue de l'écrivain 75000 PARIS",
        password: "Voltaire75"    
    })
    //create a user in the db
    await user.create(authMocked)

})
/**
 * after each test,clear all date which present in the mocked database
//  */
afterEach(async () => {await db.clearDatabase()})
/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await db.closeDatabase()})

describe('test function for auth', ()=> {
    
    let authMocked = new user({
        lastname: "François-Marie", 
        forname: "Arouet", 
        mail: null,
        address: "2 rue de l'écrivain 75000 PARIS",
        password: null    
    })
    let authNotMocked = new user({
        lastname: "Diderot", 
        forname: "Denis", 
        mail: "denis.diderot@test.com",
        address: "6 rue de l'écrivain 75000 PARIS",
        password: 'Diderot75'    
    })

    it('test authenticationSend with email & password null', async()=>{
        let req = httpMock.createRequest({body:authMocked})
        let res = httpMock.createResponse()
        await authControler.authenticationSend(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(400)
        expect(data.message).toBe('missing argument(s)')
    })

    it('test authenticationSend with mail null', async()=>{        
        authMocked.password = 'Voltairenpm t'
        let req = httpMock.createRequest({body:authMocked})
        let res = httpMock.createResponse()
        await authControler.authenticationSend(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(400)
        expect(data.message).toBe('missing argument(s)')
    })
    
    
    it('test authenticationSend with password null', async()=>{
        authMocked.mail = 'fm.voltaire@test.com'        
        authMocked.password = null
        let req = httpMock.createRequest({body:authMocked})
        let res = httpMock.createResponse()
        await authControler.authenticationSend(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(400)
        expect(data.message).toBe('missing argument(s)')
        authMocked.password = 'Voltaire75'
    })

    it('test authenticationSend but user does not exist', async()=>{
        let req = httpMock.createRequest({body:authNotMocked})
        let res = httpMock.createResponse()
        await authControler.authenticationSend(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(400)
        expect(data.message).toBe('the user does not exist')
    })

    it('test authenticationSend but password is wrong', async()=>{
        authMocked.password = "test"
        let req = httpMock.createRequest({body:authMocked})
        let res = httpMock.createResponse()
        await authControler.authenticationSend(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(401)
        expect(data.message).toBe('password is wrong')
    })

})