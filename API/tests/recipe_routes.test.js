const mockedDB = require("./db_handle")

const request = require('supertest')
const app = require('../app')
const recipeModel = require("../model/recipe")


beforeAll(async () => { await mockedDB.connect() })
afterAll(async () => { await mockedDB.closeDatabase() })

let recipeModel = new recipeModel({
    name: "Pizza 4 fromages",
    ingredients: ["Camembert", "Chèvre", "Raclette", "Bleu"],
    price: 12
})


describe('Test every path for /recipe route', () => {

    it('test path put \"/recipe/\"', async () => {

        const res = await request(app)
            .put('/recipe')
            .send({
                name: recipeModel.name,
                ingredients: recipeModel.ingredients,
                price: recipeModel.price
            })
        expect(res.body.message).toBe(`Recipe ${recipeModel.name} created successfully`)
        expect(res.status).toBe(201)
    })


    it('test path get \"/recipe/:id\"', async () => {
        const resId = await request(app)
            .get(`/recipe/full`)
            .send({
                name: recipeModel.name,
                ingredients: recipeModel.ingredients,
                price: recipeModel.price
            })
        const resCommand = await request(app)
            .get(`/recipe/${resId.body.data}`)
            .send({
                _id: resId.body.data
            })
        expect(resCommand.status).toBe(200)
        expect(resCommand.body.data._id).toBe(resId.body.data)
        expect(resCommand.body.data.name).toBe(recipeModel.name)
        expect(resCommand.body.data.ingredients).toBe(recipeModel.ingredients)
        expect(resCommand.body.data.price).toBe(recipeModel.price)
    })

    it('test path patch \"/recipe/:id\"', async () => {
        //get the id
        let resId = await request(app)
            .get('/recipe/full')
            .send({
                name: recipeModel.name,
                ingredients: recipeModel.ingredients
            })
        //Set user with new model
        let resSet = await request(app)
            .patch(`/recipe/${resId.body.data}`)
            .send({
                _id: resId.body.data,
                name: recipeModel.name,
                ingredients: recipeModel.ingredients,
                price: recipeModel.price
            })
        //check if code is correct and message
        expect(resSet.status).toBe(200)
        expect(resSet.body).toBe(`Command setted successfully`)

        //check if path is correct and set done 
        let resCheck = await request(app)
            .get(`/recipe/${resId.body.data}`)
            .send({
                _id: resId.body.data
            })
        expect(resCheck.status).toBe(200)
        expect(resCheck.body.data.name).toBe(recipeSet.name)
        expect(resCheck.body.data.ingredients).toBe(recipeSet.ingredients)
        expect(resCheck.body.data.price).toBe(recipeSet.price)
    })

    it('test path delete \"recipe/:id\"', async () => {
        //get the id
        const resId = await request(app)
            .get(`/recipe/full`)
            .send({
                name: recipeModel.name,
                ingredients: recipeModel.ingredients,
                price: recipeModel.price
            })
        //Check the delete the recipe 
        let resDelete = await request(app)
            .delete(`/recipe/${resId.body.data}`)
            .send({
                _id: resId.body.data
            })
        expect(resDelete.body.message).toBe(`recipe with id ${resId.body.data} deleted successfully`)
        expect(resDelete.status).toBe(201)

        //Check if user deleted
        let resCheck = await request(app)
            .get(`/recipe/${resId.body.data}`)
            .send({
                _id: resId.body.data
            })
        expect(resCheck.status).toBe(400)
        expect(resCheck.body.message).toBe(`recipe not found`)
    })
})