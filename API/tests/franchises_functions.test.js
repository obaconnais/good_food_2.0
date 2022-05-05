const db = require("./db_handle")
const httpMock = require('node-mocks-http');
const franchise = require("../controler/franchise");

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
 
describe('mongodb franchises response and connexion',()=>{

    let name = "McDO"

    /* CREATE */

    it('create franchise', async () => {
        let req = httpMock.createRequest({body:{name}})
        let res = httpMock.createResponse()
        await franchise.createFranchise(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Franchise ${name} was created successfully`)
        expect(status).toBe(200)
    })

    it('create franchise without name', async () => {
        let req = httpMock.createRequest({body:{}})
        let res = httpMock.createResponse()
        await franchise.createFranchise(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Franchise\'s name is missing`)
        expect(status).toBe(400)
    })

    it('create franchise who are already created', async () => {
        let req = httpMock.createRequest({body:{name}})
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await franchise.createFranchise(req,res) 
        await franchise.createFranchise(req,res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`Franchise ${name} already exists`)
        expect(status).toBe(409)
    })


    /* GET */

    it('get all franchises', async () => {
        let req = httpMock.createRequest()
        let res = httpMock.createResponse()
        await franchise.getAllFranchises(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.message).toBe('Franchises were found')
        expect(resData.data.length).toBe(0)
    })

    it('get franchise by name', async () => {
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())
            
        let req = httpMock.createRequest({params: {name: name}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
    })

    it('get franchise by name but franchise doesn\'t exist', async () => {
        let req = httpMock.createRequest({params: {name: name}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.message).toBe(`Franchise with name : ${name} wasn't found`)
        expect(resData.found).toBe(false)
    })

    it('get franchise by name but name is null', async () => {
        let req = httpMock.createRequest({params: {name: null}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseByName(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Name is not defined, cannot find any franchise')
    })


    it('get franchise by id', async () => {
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())

        //Pick up id from this franchise
        let resId = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name: name}}),
            resId)
        let id = resId._getJSONData().data._id

        let req = httpMock.createRequest({params: {_id: id}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
    })

    it('get franchise by id but franchise doesn\'t exist', async () => {
        let req = httpMock.createRequest({params: {_id: '123456789000'}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.message).toBe(`Franchise with id : 123456789000 wasn't found`)
        expect(resData.found).toBe(false)
    })

    it('get franchise by id but id is null', async () => {
        let req = httpMock.createRequest({params: {_id: null}})
        let res = httpMock.createResponse()
        await franchise.getFranchiseById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Id is not defined, cannot find any franchise')
    })


    /* UPDATE */

    it('update franchise', async () => {
        const body = {
            name: 'McDonald\'s'
        }
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())

        //Pick up ID from franchise created
        let resId1 = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name:name}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await franchise.setFranchise(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.message).toBe('Franchise was updated successfully')

        let resId2 = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name: body.name}}),
            resId2)
        let updatedFranchise = resId2._getJSONData().data
        
        expect(updatedFranchise._id).toBe(id)
        expect(updatedFranchise.name).toBe(body.name)
    })

    it('update franchise\'s name but name is not compliant', async () => {
        const body = {
            name: '(***)'
        }
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())

        //Pick up ID from franchise created
        let resId1 = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name:name}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await franchise.setFranchise(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Name is not compliant')
    })

    it('update franchise\'s name but name already exists', async () => {
        const body = {
            name: name
        }
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())
        await franchise.createFranchise(
            httpMock.createRequest({body:{name: 'McDonald\'s'}}),
            httpMock.createResponse())

        //Pick up ID from franchise created
        let resId1 = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name:'McDonald\'s'}}),
            resId1)
        let id = resId1._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}, body: body})
        let res = httpMock.createResponse()
        await franchise.setFranchise(req, res)
        let resData = res._getJSONData()
        
        expect(res._getStatusCode()).toBe(409)
        expect(resData.message).toBe(`Franchise ${body.name} already exists`)

        let resId2 = httpMock.createResponse()
        await franchise.getFranchiseByName(
            httpMock.createRequest({params:{name: name}}),
            resId2)
        expect(resId2._getStatusCode()).toBe(200)
    })


    /* DELETE */

    it('delete franchise', async () => {
        //Create franchise
        await franchise.createFranchise(
            httpMock.createRequest({body:{name}}),
            httpMock.createResponse())

        //Pick up ID from franchise created
        let reqId = httpMock.createRequest({params:{name:name}})
        let resId = httpMock.createResponse()
        await franchise.getFranchiseByName(reqId,resId)
        let id = resId._getJSONData().data._id

        let req = httpMock.createRequest({params:{_id: id}})
        let res = httpMock.createResponse()
        await franchise.deleteFranchise(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Franchise was deleted successfully`)
        expect(status).toBe(200)
    })

    it('delete franchise but franchise doesn\'t exist', async () => {
        let req = httpMock.createRequest({params:{_id: '123456789000'}})
        let res = httpMock.createResponse()
        await franchise.deleteFranchise(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(status).toBe(404)
        expect(data.message).toBe(`Franchise with id : 123456789000 wasn't found`)
    })

    it('delete franchise but franchise is null', async () => {
        let req = httpMock.createRequest({params:{_id: null}})
        let res = httpMock.createResponse()
        await franchise.deleteFranchise(req,res) 
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Id is not defined, cannot find any franchise`)
        expect(status).toBe(400)
    })
})