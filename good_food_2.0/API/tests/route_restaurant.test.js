const db = require("./db_handle")
const httpMock = require('node-mocks-http');
const restaurant = require("../controller/restaurant");

describe('mongo db connection',()=>{

beforeAll(async () =>  await db.connect())
afterAll(async ()=> await db.closeDatabase())
    let name = "McDO"
    let address = "14 rue du miam"
    let telephone = "+33678912345"
    let mail = "mcdo@maim.fr"
    let franchised = true
    let schedule = {"mon":[{"begin": "9h00", "end": "18h00"}]}
    let global_id

    /* CREATE */

    it('create restaurant', async () => {
        let req = httpMock.createRequest({body:{name,address,telephone,mail,franchised,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Restaurant ${name} was created successfully`)
        expect(status).toBe(200)
        global_id = id
    })

    it('create restaurant without name', async () => {
        let req = httpMock.createRequest({body:{address,telephone,mail,franchised,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without address', async () => {
        let req = httpMock.createRequest({body:{name,telephone,mail,franchised,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without telephone', async () => {
        let req = httpMock.createRequest({body:{name,address,mail,franchised,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without mail', async () => {
        let req = httpMock.createRequest({body:{name,address,telephone,franchised,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without franchised', async () => {
        let req = httpMock.createRequest({body:{name,address,telephone,mail,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without schedule', async () => {
        let req = httpMock.createRequest({body:{name,address,telephone,mail,franchised}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant who are already created', async () => {
        let req = httpMock.createRequest({body:{name,address,telephone,mail,franchised}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Restaurant ${name} already exists`)
        expect(status).toBe(409)
    })

    let req = httpMock.createRequest({body:{name,address,telephone,mail,franchised}})
    let res = httpMock.createResponse()
    await restaurant.findRestaurantByName(req,res)
    global_id = res._getJSONData().data[0]._id;

    /* UPDATE */

    it('update restaurant', async () => {})

    it('update name restaurant', async () => {})

    it('update address restaurant', async () => {})

    it('update telephone restaurant', async () => {})

    it('update mail restaurant', async () => {})

    it('update franchised restaurant', async () => {})

    it('update schedule restaurant', async () => {})

    it('update name restaurant but name is not certified', async () => {})

    it('update address restaurant but address is null', async () => {})

    it('update telephone restaurant but telephone is not certified', async () => {})

    it('update mail restaurant but mail is not certified', async () => {})

    it('update franchised restaurant but franchised is null', async () => {})

    it('update schedule restaurant but schedule is null', async () => {})

    /* FIND */

    it('find all restaurants', async () => {})

    it('find all restaurants but there are not restaurants', async () => {})

    it('find restaurant but doesn\'t exist', async () => {})

    it('find restaurant but restaurant is null', async () => {})

    /* DELETE */

    it('delete restaurant', async () => {
        let req = httpMock.createRequest({params:{id:global_id}})
        let res = httpMock.createResponse()
        await restaurant.removeRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`OK`)
        expect(status).toBe(200)
    })

    it('delete restaurant but restaurant is null', async () => {
        let req = httpMock.createRequest({params:{id:null}})
        let res = httpMock.createResponse()
        await restaurant.removeRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Id is not defined, cannot find any restaurant`)
        expect(status).toBe(400)
    })
})