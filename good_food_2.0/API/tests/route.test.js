const db = require("./db_handle")
const httpMock = require('node-mocks-http');
const user = require("../controller/user");

describe('mongo db connection',()=>{

beforeAll(async () =>  await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async ()=> await db.closeDatabase())
    let lastname = "IME"
    let forname = "Vincent"
    let mail= "vincent.ime@gmail.com"
    let address = "1 rue de l'épilation 58170 Poil"

    it('create user normally', async () => {
        let req = httpMock.createRequest({body:{lastname,forname,mail,address}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`the user ${lastname} ${forname} created successfully`)
        expect(status).toBe(204)
    })

    it('create user without lastname field', async () => {
        let req = httpMock.createRequest({body:{lastname: null,forname,mail,address}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
    }) 
    
    it('create user without forname field', async () => {
        let req = httpMock.createRequest({body:{lastname,forname:null,mail,address}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
    }) 
    
    it('create user without mail field', async () => {
        let req = httpMock.createRequest({body:{lastname,forname,mail:null,address}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
    }) 
    
    it('create user without address field', async () => {
        let req = httpMock.createRequest({body:{lastname,forname,mail,address:null}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
    }) 

    it('create user without needed fields', async () => {
        let req = httpMock.createRequest({body:{lastname:null,forname:null,mail:null,address:null}})
        let res = httpMock.createResponse()
        await user.createUser(req,res)
        //useful to get 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`at least on field are missing`)
        expect(status).toBe(400)
    }) 
    
    it('create user who are already created', async () => {
        let req = httpMock.createRequest({body:{lastname,forname,mail,address}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await user.createUser(req,res)
        await user.createUser(req,res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`the user ${lastname} ${forname} already exist`)
        expect(status).toBe(409)
    } )
    
    it ('get user but don\'t exist', async () =>{
        let req = httpMock.createRequest({body:{mail}})
        let res = httpMock.createResponse()
        await user.getUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`user with  mail ${mail} doesn't exist`)
        expect(status).toBe(404)
    })
    
    it('get user but user is null', async () => { 
        let req = httpMock.createRequest({body:{mail:null}})
        let res = httpMock.createResponse()
        await user.getUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Missing data, expected a mail`)
        expect(status).toBe(400)
    }) 
    
    it('delete a user', async () => {
        let req = httpMock.createRequest({body:{mail}})
        let req2 = httpMock.createRequest({body: {lastname,forname,mail,address}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await user.createUser(req2,res2)
        await user.deleteUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`user with mail ${mail} deleted successfully`)
        expect(status).toBe(204)
    })
    
    it('delete a user, but null', async () => {
        let req = httpMock.createRequest({body:{mail: null}})
        let req2 = httpMock.createRequest({body: {lastname,forname,mail,address}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await user.createUser(req2,res2)
        await user.deleteUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Missing data, expected a mail`)
        expect(status).toBe(400)
    })

    it('modify user with all field', async ()=>{
        let req = httpMock.createRequest({body:{lastname,forname,mail,address}})
        let req2 = httpMock.createRequest({body:
            {
                lastname: "Hugo",
                forname: "Victor",
                mail: "victor.hugo@gmail.com",
                address: "140 grande rue 25000 BESANCON"
            }
        })
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        user.createUser(req, res)
        user.setUser(req2,res2)
        let status = res2._getStatusCode()
        // expect(data.message).toBe(`user Hugo Victor modified successfully`)
        expect(status).toBe(204)
    })

    // it('modify user with field', async ()=>{
    //     //test the lastname field
    //     let userToBeModified = new user({lastname: "Bon", forname: "Jean", mail:"jean.bon@gmail.com",address:"1 rue de la boucherie 75600 PORCLAND"})
    //     await User.createUser(userToBeModified)
    //     await User.setUserLastname({lastname: "Victor"}, userToBeModified)
    //     userToBeModified.lastname = "Victor"
    //     let userModified = await User.findUser(userToBeModified)
    //     expect(userModified).toBe(userToBeModified)
    //     //test the forname field
    //     await User.setUserForname({forname: "Hugo"}, userToBeModified)
    //     userToBeModified.forname = "Hugo"
    //     userModified = await User.findUser(userToBeModified)
    //     expect(userModified).toBe(userToBeModified)
    //     //test the mail field
    //     await User.setUserMail({mail: "victor.hugo@gmail.com"}, userToBeModified)
    //     userToBeModified.mail = "victor.hugo@gmail.com"
    //     userModified = await User.findUser(userToBeModified)
    //     expect(userModified).toBe(userToBeModified)
    //     //test the address field
    //     await User.setUserAddress({address: "140 grande rue 25000 Besançon"}, userToBeModified)
    //     userToBeModified.address = "140 grande rue 25000 Besançon"
    //     userModified = await User.findUser(userToBeModified)
    //     expect(userModified).toBe(userToBeModified)
    // })
})
