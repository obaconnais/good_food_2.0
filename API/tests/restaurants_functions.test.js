/**
 * use the db configuration  only for test
 * use the ./tests/db_handle file instead of db_config
 */
 const db = require("./db_handle")
 const franchise = require('../model/franchise')

 /**
  * useful for mock http request
  */
 const httpMock = require('node-mocks-http');
 const restaurant = require("../controler/restaurant");
 const restModel = require("../model/restaurant")
 /**
 * before each test, connect to the mocked database
  */
 beforeAll(async () => {await db.connect()})
 /**
 * before each test,clear all data which present in the mocked database
 * instanciate a new franchise
 */
  beforeEach(async () => {
    await db.clearDatabase()
    await franchise.create({ name: 'McDonald\'s France' })
})
 /**
 * after tests passed, disconnect and close the mocked database
 */
 afterAll(async () => {await db.closeDatabase()})

 describe('mongodb restaurants response and connexion',()=>{

    let name = "McDO"
    let address = {street:"14 rue du miam", postCode:"64000", city:"PAU", Country:"FRANCE"}
    let phone = "+33678912345"
    let mail = "mcdo@maim.fr"
    let franchiseName = 'McDonald\'s France'
    let schedule = {"mon":[{"begin": "9h00", "end": "18h00"}]}

    let nameTwo = "Ronsard"
    let addressTwos = {street:"12 rue de la Paix", postCode:"64000", city:"PAU", Country:"FRANCE"}
    let phoneTwo = "+33678912655"
    let mailTwo = "ronsard@maim.fr"

    let nameThree = "le combawa"
    let addressThree = {street:"34 boulevard des Couettes", postCode:"64320", city:"BIZANOS", Country:"FRANCE"}
    let phoneThree = "+33559873409"
    let mailThree = "le.combawa@maim.fr"
    /* CREATE */

    it('create restaurant', async () => {
        let req = httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Restaurant ${name} was created successfully`)
        expect(status).toBe(200)
    })

    it('create restaurant without name', async () => {
        let req = httpMock.createRequest({body:{address,phone,mail,franchiseName,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without address', async () => {
        let req = httpMock.createRequest({body:{name,phone,mail,franchiseName,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without phone', async () => {
        let req = httpMock.createRequest({body:{name,address,mail,franchiseName,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without mail', async () => {
        let req = httpMock.createRequest({body:{name,address,phone,franchiseName,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant without franchiseName', async () => {
        let req = httpMock.createRequest({body:{name,address,phone,mail,schedule}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Restaurant ${name} was created successfully`)
        expect(status).toBe(200)
    })

    it('create restaurant without schedule', async () => {
        let req = httpMock.createRequest({body:{name,address,phone,mail,franchiseName}})
        let res = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('create restaurant who are already created', async () => {
        let req = httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await restaurant.createRestaurant(req,res) 
        await restaurant.createRestaurant(req,res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`Restaurant ${name} already exists`)
        expect(status).toBe(409)
    })


    /* GET */

    it('get all restaurants', async () => {
        let req = httpMock.createRequest()
        let res = httpMock.createResponse()
        await restaurant.getAllRestaurants(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.message).toBe('Restaurants were found')
        expect(resData.data.length).toBe(0)
    })


    it('get restaurant by name', async () => {
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())
        let req = httpMock.createRequest({params: {name: name}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
        expect(resData.data.length).toBe(1)
    })

    it('get restaurant by name but restaurant doesn\'t exist', async () => {
        let req = httpMock.createRequest({params: {name: name}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.found).toBe(false)
        expect(resData.message).toBe(`Restaurant ${name} wasn't found`)
    })

    it('get restaurant by name but name is null', async () => {
        let req = httpMock.createRequest({params: {name: null}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Name is not defined, cannot find any restaurant')
    })


    it('get restaurant by id', async () => {
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up id from this restaurant
        let resId = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail: mail}}),
            resId)
        let id = resId._getJSONData().data._id
        let req = httpMock.createRequest({params: {_id: id}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
    })

    it('get restaurant by id but restaurant doesn\'t exist', async () => {
        let req = httpMock.createRequest({params: {_id: '123456789000'}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.message).toBe(`Restaurant with id : 123456789000 wasn't found`)
        expect(resData.found).toBe(false)
    })

    it('get restaurant by id but id is null', async () => {
        let req = httpMock.createRequest({params: {_id: null}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Id is not defined, cannot find any restaurant')
    })


    it('get restaurant by mail', async () => {
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())
            
        let req = httpMock.createRequest({params: {mail: mail}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByMail(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
    })

    it('get restaurant by mail but restaurant doesn\'t exist', async () => {
        let req = httpMock.createRequest({params: {mail: mail}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByMail(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.message).toBe(`Restaurant with mail : ${mail} wasn't found`)
        expect(resData.found).toBe(false)
    })

    it('get restaurant by mail but mail is null', async () => {
        let req = httpMock.createRequest({params: {mail: null}})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByMail(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Mail is not defined, cannot find any restaurant')
    })
    
    it('get restaurant by zipCode, but zipCode list is empty', async ()=>{
        let req = httpMock.createRequest({body:[]})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByCity(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('zipCodes is empty')
    })

    // it('get restaurant by zipCode, but no restaurants match', async ()=>{
    //     let req = httpMock.createRequest({body:['63000', '62320']})
    //     let res = httpMock.createResponse()
    //     await restaurant.getRestaurantByCity(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(400)
    //     expect(resData.message).toBe('no Restaurant founded')
    // })

    it('get restaurant by zipCode', async ()=>{
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse()
        )
        let restMocked = new restModel({
            name: nameTwo,
            address:addressTwos,
            phone:phoneTwo,
            mail:mailTwo,
            franchise:franchiseName,
            schedule:schedule
        })

        let restMockedTwo = new restModel({
            name: nameThree,
            address:addressThree,
            phone:phoneThree,
            mail:mailThree,
            franchise:franchiseName,
            schedule:schedule
        })

        await restModel.create(restMocked)
        await restModel.create(restMockedTwo)
        let req = httpMock.createRequest({body: ['64000','64320']})
        let res = httpMock.createResponse()
        await restaurant.getRestaurantByCity(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.data.length).toBe(2)
    })

    /* UPDATE */

    it('update restaurant', async () => {
        const body = {
            name: 'McDonald\'s',
            address: {street:'8 allée de la nourriture',postCode: "64000",city:'MIAM', Country:"FRANCE"},
            phone: '+33677889944',
            mail: 'contact@mcdonalds.fr',
            schedule: {"tue":[{"begin": "8h00", "end": "19h00"}]}
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.message).toBe('Restaurant was updated successfully')

        let resId2 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail: body.mail}}),
            resId2)
        let updatedRestaurant = resId2._getJSONData().data
        
        expect(updatedRestaurant._id).toBe(id)
        expect(updatedRestaurant.name).toBe(body.name)
        expect(updatedRestaurant.address).toStrictEqual(body.address)
        expect(updatedRestaurant.phone).toBe(body.phone)
        expect(updatedRestaurant.mail).toBe(body.mail)
        expect(JSON.stringify(updatedRestaurant.schedule)).toBe(JSON.stringify(body.schedule))
    })

    it('update restaurant\'s name but name is not compliant', async () => {
        const body = {
            name: '(***)'
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Name is not compliant')
    })

    it('update restaurant\'s address but address is null', async () => {
        const body = {
            address: null
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('None element defined')
    })

    it('update restaurant\'s phone but phone is not compliant', async () => {
        const body = {
            phone: '(***)'
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Phone is not compliant')
    })

    it('update restaurant\'s mail but mail is not compliant', async () => {
        const body = {
            mail: '(***)'
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Mail is not compliant')
    })

    it('update restaurant\'s mail but mail already exists', async () => {
        const body = {
            mail: mail
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail:'contact@mcdonalds.fr',franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:'contact@mcdonalds.fr'}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        
        expect(res._getStatusCode()).toBe(409)
        expect(resData.message).toBe(`Restaurant with mail ${body.mail} already exists`)

        let resId2 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail: mail}}),
            resId2)
        expect(resId2._getStatusCode()).toBe(200)
    })

    it('update restaurant\'s schedule but schedule is null', async () => {
        const body = {
            schedule: null
        }
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let resId1 = httpMock.createResponse()
        await restaurant.getRestaurantByMail(
            httpMock.createRequest({params:{mail:mail}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await restaurant.setRestaurant(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('None element defined')
    })


    /* DELETE */

    it('delete restaurant', async () => {
        //Create restaurant
        await restaurant.createRestaurant(
            httpMock.createRequest({body:{name,address,phone,mail,franchiseName,schedule}}),
            httpMock.createResponse())

        //Pick up ID from restaurant created
        let reqId = httpMock.createRequest({params:{mail:mail}})
        let resId = httpMock.createResponse()
        await restaurant.getRestaurantByMail(reqId,resId)
        let id = resId._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}})
        let res = httpMock.createResponse()
        await restaurant.deleteRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Restaurant was deleted successfully`)
        expect(status).toBe(200)
    })

    it('delete restaurant but restaurant doesn\'t exist', async () => {
        let req = httpMock.createRequest({params:{_id: '123456789000'}})
        let res = httpMock.createResponse()
        await restaurant.deleteRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(404)
        expect(data.message).toBe(`Restaurant with id : 123456789000 wasn't found`)
    })

    it('delete restaurant but restaurant is null', async () => {
        let req = httpMock.createRequest({params:{_id: null}})
        let res = httpMock.createResponse()
        await restaurant.deleteRestaurant(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Id is not defined, cannot find any restaurant`)
        expect(status).toBe(400)
    })

})
