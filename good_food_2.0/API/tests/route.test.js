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
    
    it('create user which are already created', async () => {
        let req = httpMock.createRequest({body:{lastname,forname,mail,address}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await user.createUser(req,res)
        await user.createUser(req,res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`the user ${lastname} ${forname} already exist`)
        expect(status).toBe(409)
    })
    
    it('get user normally', async ()=> {
        //Create a new user
        let reqCreate = httpMock.createRequest({body:{lastname, forname, mail, address}})
        let resCreate = httpMock.createResponse()
        await user.createUser(reqCreate,resCreate)
        
        //Pick up id from this user
        let reqId = httpMock.createRequest({body:{mail: mail}})
        let resId = httpMock.createResponse()
        await user.getUserId(reqId, resId)
        let id = resId._getJSONData().data
        
        //Search with this id
        let reqGet = httpMock.createRequest({body:{_id:id}})
        let resGet = httpMock.createResponse()
        await user.getUser(reqGet, resGet)
        let dataGet = resGet._getJSONData()
        let statusGet = resGet._getStatusCode()
        expect(statusGet).toBe(200)
        expect(dataGet.data._id).toBe(id)
        expect(dataGet.data.lastname).toBe(lastname)
        expect(dataGet.data.forname).toBe(forname)
        expect(dataGet.data.mail).toBe(mail)
        expect(dataGet.data.address).toBe(address)
    })

    it('get user but don\'t exist', async () =>{
        let _id = "62275094792e16d60e3247f2"
        let req = httpMock.createRequest({body:{_id: _id}})
        let res = httpMock.createResponse()
        await user.getUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`user with id ${_id} doesn't exist`)
        expect(status).toBe(404)
    })
    
    it('get user but user is null', async () => { 
        let req = httpMock.createRequest({body:{_id:null}})
        let res = httpMock.createResponse()
        await user.getUser(req,res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Missing data, expected an _id`)
        expect(status).toBe(400)
    }) 
    
    it('delete a user', async () => {
        let reqCreate = httpMock.createRequest({body: {lastname,forname,mail,address}})
        let resCreate = httpMock.createResponse()
        await user.createUser(reqCreate,resCreate)
        //Pick up ID from user created
        let reqId = httpMock.createRequest({body:{mail:mail}})
        let resId = httpMock.createResponse()
        await user.getUserId(reqId,resId)
        let _id = resId._getJSONData()
        //Delete the user and check what's happened
        let reqDelete = httpMock.createRequest({body:{_id: _id.data}})
        let resDelete = httpMock.createResponse()
        await user.deleteUser(reqDelete,resDelete)
        let data = resDelete._getJSONData()
        let status = resDelete._getStatusCode()
        expect(data.message).toBe(`user with id ${_id.data} deleted successfully`)
        expect(status).toBe(204)
    })
    
    it('delete a user, but null', async () => {
        let reqCreate = httpMock.createRequest({body: {lastname,forname,mail,address}})
        let resCreate = httpMock.createResponse()
        await user.createUser(reqCreate,resCreate)
        let reqDelete = httpMock.createRequest({body:{_id: null}})
        let resDelete = httpMock.createResponse()
        await user.deleteUser(reqDelete,resDelete)
        let data = resDelete._getJSONData()
        let status = resDelete._getStatusCode()
        expect(data.message).toBe(`Missing data, expected an id`)
        expect(status).toBe(400)
    })

    it('modify user with all field', async ()=>{
        //Data set useful for setting user
        let lastnameSet = "de Lamartine"
        let fornameSet = "Alphonse"
        let mailSet = `${lastnameSet}.${fornameSet}@gmail.com`
        let addressSet = "24 avenue de la rouerie 59380 BERGUES"

        //Create user which will be modified soon
        let reqCreate = httpMock.createRequest({body:{lastname,forname,mail,address}})
        let resCreate = httpMock.createResponse()
        await user.createUser(reqCreate, resCreate)
        let message = resCreate._getJSONData()
        expect(message.message).toBe(`the user ${lastname} ${forname} created successfully`)
        let status = resCreate._getStatusCode()
        expect(status).toBe(204)
        
        //Pick up Id from the user
        let reqId = httpMock.createRequest({body:{mail: mail}})
        let resId = httpMock.createResponse()
        await user.getUserId(reqId,resId)
        let _id = resId._getJSONData().data
        
        //Modify user with new values in mocked DB
        let reqSet = httpMock.createRequest({body:{_id: _id, lastname: lastnameSet,forname: fornameSet,mail: mailSet,address: addressSet}})
        let resSet = httpMock.createResponse()
        await user.setUser(reqSet,resSet)
        let statusSet = resSet._getStatusCode()
        expect(statusSet).toBe(204)
        let dataSet = resSet._getJSONData()
        expect(dataSet.message).toBe(`user ${lastnameSet} ${fornameSet} modified successfully`)
        
        //Check if user have been modified in mocked DB
        let reqGet = httpMock.createRequest({body:{_id:_id}})
        let resGet = httpMock.createResponse()
        await user.getUser(reqGet, resGet)
        let dataResult = resGet._getJSONData()
        expect(dataResult.data.lastname).toBe(`${lastnameSet}`)
        expect(dataResult.data.forname).toBe(`${fornameSet}`)
        expect(dataResult.data.address).toBe(`${addressSet}`)
        expect(dataResult.data.mail).toBe(`${mailSet}`)
        let statusGet = resGet._getStatusCode()
        expect(statusGet).toBe(200)
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
