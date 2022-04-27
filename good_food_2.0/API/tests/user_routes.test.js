/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")
const userModels = require("../model/user")
const user = require('../model/user')

/***********************************************/
/***** data base configuration during test *****/
/***********************************************/

/**
 * before each test, connect to the mocked database
 */
beforeAll(async () => {await mockedDb.connect()})

/**
 * after tests passed, disconnect and close the mocked database
 */
afterAll(async () => {await mockedDb.closeDatabase()})

/**
 * define models to populate the mocked database if necessary
 */
 let userModel = new userModels({
    lastname:"Hugo",
    forname:"Victor",
    mail:"victor.hugo@gmail.com",
    address:"1 rue de la Mine 26000 GERMINAL"
})

let userSet = new userModels({
    lastname: "Camus",
    forname: "Albert",
    mail: "albert.camus@gmail.com",
    address: "14 rue de l'Homme révolté 12345 LA CHUTE"
})

describe('Test every path for /user end-point', () => {

    it('test path put \"/user/\"', async ()=> {
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

    it('test path get \"user/mail\"', async () => {
        const res = await request(app)
                                .get(`/user/mail`)
                                .send({
                                    mail: userModel.mail
                                })
        expect(res.status).toBe(200)
    })
    
    it('test path get \"/user/:id\"', async () => {
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
    
    it('test path patch \"/user/:id\"', async ()=> {
        //get the id
        let resId = await request(app)
        .get('/user/mail')
        .send({
            mail: userModel.mail
        })       
        
        //Set user with new model
        let resSet = await request(app)
        .patch(`/user/${resId.body.data}`)
        .send({
            _id: resId.body.data,
            lastname: userSet.lastname,
            forname: userSet.forname,
            mail: userSet.mail, 
            address: userSet.address
        })
        //check if code is correct and message
        expect(resSet.status).toBe(200)
        expect(resSet.body.message).toBe(`User with id ${resId.body.data} updated successfully`)
        
        //check if path is correct and set done 
        let resCheck = await request(app)
        .get(`/user/${resId.body.data}`)
        .send({
            _id: resId.body.data
        })
        expect(resCheck.status).toBe(200)
        expect(resCheck.body.data.lastname).toBe(userSet.lastname)
        expect(resCheck.body.data.forname).toBe(userSet.forname)
        expect(resCheck.body.data.mail).toBe(userSet.mail)
        expect(resCheck.body.data.address).toBe(userSet.address)
    })
    
    it('test path delete \"user/:id\"', async ()=> {
        //get the id
        let resId = await request(app)
                            .get(`/user/mail`)
                            .send({
                                mail: userSet.mail
                            })
        
        //Check the delete the user 
        let resDelete = await request(app)
                                .delete(`/user/${resId.body.data}`)
                                .send({
                                    _id: resId.body.data
                                })
        expect(resDelete.status).toBe(200)
        expect(resDelete.body.message).toBe(`user with id ${resId.body.data} deleted successfully`)
        
        //Check if user deleted
        let resCheck = await request(app)
                                .get(`/user/${resId.body.data}`)
                                .send({
                                    _id: resId.body.data
                                })
        expect(resCheck.status).toBe(404)
        expect(resCheck.body.message).toBe(`user with id ${resId.body.data} doesn't exist`)
    })
})