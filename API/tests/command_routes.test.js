/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
/**
 * use the db configuration  only for test
 * use the ./tests/db_handle file instead db_config
 */
 const mockedDb = require("./db_handle")
 /*
 * useful for mock an http Frame
 */
 const request = require('supertest')
 const app = require('../app')
 const commandModels = require("../model/command")
 
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
  let commandModel = new commandModels({
     kind: "delivery",
     restaurant: "pizza hut",
     paymentMethod: "Card",
     date: new Date('March 18, 2022 18:58:00'), 
     products: ["reine","margarita","royal"],
     price: 34,
     currency: "Euro",
     state:'delivered'
 })
 
 let commandSet = new commandModels({
     kind: "delivery",
     restaurant: "You sushi",
     paymentMethod: "Cash",
     date: new Date('March 22, 2022 13:00:00'), 
     products: ["sushi","wasabi","sauce soja"],
     price: 50,
     currency: "Livre",
     state:'In progress'
 })
 
 describe('Test every path for /command end-point', () => {
 
     it('test path put \"/command/\"', async ()=> {
 
         const res = await request(app)
                             .put('/command')
                             .send({
                                 kind: commandModel.kind,
                                 restaurant: commandModel.restaurant,
                                 paymentMethod: commandModel.paymentMethod,
                                 date: commandModel.date, 
                                 products: commandModel.products,
                                 price: commandModel.price,
                                 currency: commandModel.currency,
                                 state:commandModel.state
                             })
         expect(res.body.message).toBe(`command created`)
         expect(res.status).toBe(201)
     })
 
     it('test path get \"command/full\"', async () => {
         const res = await request(app)
                                 .get(`/command/full`)
                                 .send({
                                     kind: commandModel.kind,
                                     restaurant: commandModel.restaurant,
                                     paymentMethod: commandModel.paymentMethod,
                                     date: commandModel.date, 
                                     products: commandModel.products,
                                     price: commandModel.price,
                                     currency: commandModel.currency,
                                     state:commandModel.state
                                 })
         expect(res.status).toBe(200)
     })
     
     it('test path get \"/command/:id\"', async () => {
         const resId = await request(app)
                                 .get(`/command/full`)
                                 .send({
                                     kind: commandModel.kind,
                                     restaurant: commandModel.restaurant,
                                     paymentMethod: commandModel.paymentMethod,
                                     date: commandModel.date, 
                                     products: commandModel.products,
                                     price: commandModel.price,
                                     currency: commandModel.currency,
                                     state:commandModel.state
                                 })
         const resCommand = await request(app)
                                 .get(`/command/${resId.body.data}`)
                                 .send({
                                     _id: resId.body.data
                                 })
         expect(resCommand.status).toBe(200)
         expect(resCommand.body.data._id).toBe(resId.body.data)
         expect(resCommand.body.data.kind).toBe(commandModel.kind)
         expect(resCommand.body.data.paymentMethod).toBe(commandModel.paymentMethod)
         expect(resCommand.body.data.restaurant).toBe(commandModel.restaurant)
         expect(resCommand.body.data.products).toStrictEqual(commandModel.products)
         expect(resCommand.body.data.price).toBe(commandModel.price)
         expect(resCommand.body.data.currency).toBe(commandModel.currency)
         expect(resCommand.body.data.state).toBe(commandModel.state)
         expect(new Date(resCommand.body.data.date)).toStrictEqual(commandModel.date)
         
     })
     
     it('test path patch \"/command/:id\"', async ()=> {
         //get the id
         let resId = await request(app)
         .get('/command/full')
         .send({
             kind: commandModel.kind,
             restaurant: commandModel.restaurant,
             paymentMethod: commandModel.paymentMethod,
             date: commandModel.date, 
             products: commandModel.products,
             price: commandModel.price,
             currency: commandModel.currency,
             state:commandModel.state
         })       
         //Set user with new model
         let resSet = await request(app)
         .patch(`/command/${resId.body.data}`)
         .send({
             _id: resId.body.data,
             kind: commandSet.kind,
             restaurant: commandSet.restaurant,
             paymentMethod: commandSet.paymentMethod,
             date: commandSet.date, 
             products: commandSet.products,
             price: commandSet.price,
             currency: commandSet.currency,
             state: commandSet.state
         })
         //check if code is correct and message
         expect(resSet.status).toBe(200)
         expect(resSet.body).toBe(`Command setted successfully`)
         
         //check if path is correct and set done 
         let resCheck = await request(app)
         .get(`/command/${resId.body.data}`)
         .send({
             _id: resId.body.data
         })
         expect(resCheck.status).toBe(200)
         expect(resCheck.body.data.kind).toBe(commandSet.kind)
         expect(resCheck.body.data.restaurant).toBe(commandSet.restaurant)
         expect(resCheck.body.data.paymentMethod).toBe(commandSet.paymentMethod)
         expect(resCheck.body.data.products).toStrictEqual(commandSet.products)
         expect(resCheck.body.data.price).toBe(commandSet.price)
         expect(resCheck.body.data.state).toBe(commandSet.state)
     })
     
     it('test path delete \"command/:id\"', async ()=> {
         //get the id
         const resId = await request(app)
                             .get(`/command/full`)
                             .send({
                                 kind: commandSet.kind,
                                 restaurant: commandSet.restaurant,
                                 paymentMethod: commandSet.paymentMethod,
                                 date: commandSet.date,
                                 products: commandSet.products,
                                 price: commandSet.price, 
                                 currency: commandSet.currency,
                                 state: commandSet.state
                             })
         //Check the delete the command 
         let resDelete = await request(app)
                                 .delete(`/command/${resId.body.data}`)
                                 .send({
                                     _id: resId.body.data
                                 })
         expect(resDelete.body.message).toBe(`command with id ${resId.body.data} deleted successfully`)
         expect(resDelete.status).toBe(201)
         
         //Check if user deleted
         let resCheck = await request(app)
                                 .get(`/command/${resId.body.data}`)
                                 .send({
                                     _id: resId.body.data
                                 })
         expect(resCheck.status).toBe(400)
         expect(resCheck.body.message).toBe(`command not found`)
     })
 })