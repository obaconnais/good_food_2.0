const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")
const userModels = require("../model/user")

/**
 * before each test, connect to the mocked database
 */
beforeAll(async () => {await mockedDb.connect()})
/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await mockedDb.closeDatabase()})

/**
 * define a model to populate the mocked database if necessary
 */
 let userModel = new userModels({
    lastname:"Hugo",
    forname:"Victor",
    mail:"victor.hugo@gmail.com",
    address:"1 rue de la Mine 26000 GERMINAL"
})

describe('Post Endpoints', () => {

    it('test path \"get/\"', async () => {
        const res = await request(app)
                        .get('/')
        expect(res.text).toBe("server is online")
    })

    it('test path \"/user/put\"', async ()=> {
        const res = await request(app)
                            .put('/user')
                            .send({
                                lastname: userModel.lastname,
                                forname: userModel.forname,
                                mail: userModel.mail,
                                address: userModel.address
                            })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe(`the user ${userModel.lastname} ${userModel.forname} created successfully`)
    })

    it('test path \"user/get/mail\"', async () => {
        const res = await request(app)
                                .get(`/user/mail`)
                                .send({
                                    mail: userModel.mail
                                })
        expect(res.status).toBe(200)
    })
    
    it('test path \"/user/get/:id\"', async () =>{
        const resId = await request(app)
                                .get(`/user/mail`)
                                .send({
                                    mail: userModel.mail
                                })
        const resUser = await request(app)
                                .get(`/user/${resId.body.data}`)
                                .send({
                                    _id: resId.body.data
                                })
        expect(resUser.status).toBe(200)
        expect(resUser.body.data._id).toBe(resId.body.data)
        expect(resUser.body.data.forname).toBe(userModel.forname)
        expect(resUser.body.data.lastname).toBe(userModel.lastname)
        expect(resUser.body.data.mail).toBe(userModel.mail)
        expect(resUser.body.data.address).toBe(userModel.address)
    })
})