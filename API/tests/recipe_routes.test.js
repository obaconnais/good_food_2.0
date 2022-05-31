const mockedDB = require("./db_handle")
const request = require('supertest')
const app = require('../app')
const recipeModel = require("../model/recipe")


beforeAll(async () => { 
    await mockedDB.connect()
 })
afterAll(async () => { await mockedDB.closeDatabase() })



describe('Recipe tests routes', () => {
    let recipeMocked = new recipeModel({
        name: "Pizza 4 fromages",
        ingredients: ["Camembert", "Chèvre", "Raclette", "Bleu"],
        price: 12,
        restaurant_id : []
    })

    let recipeMocked2 = new recipeModel({
        name: "margarita",
        ingredients: ["mozzarella", "Tomate"],
        price: 18,
        restaurant_id : ["627c2d155d9ba56b3494bfa8"]
    })

    it('Test PUT \"/recipe\"', async () => {
        const res = await request(app)
                    .put('/recipe')
                    .send({
                        name: recipeMocked.name,
                        ingredients: recipeMocked.ingredients,
                        price: recipeMocked.price,
                        restaurant_id: recipeMocked.restaurant_id
                    })
                    expect(res.status).toBe(201)
                    expect(res.body.message).toBe(`Recipe ${recipeMocked.name} created successfully`)
    })


    it('Test GET \"/recipe/:id\"', async () => {
        const resId = await request(app)
                        .get(`/recipe/name`)
                        .send({
                            name: recipeMocked.name,
                            ingredients:recipeMocked.ingredients,
                            price: recipeMocked.price,
                            restaurant_id: recipeMocked.restaurant_id
                        })
        const resCommand = await request(app)
                        .get(`/recipe/${resId.body.data._id}`)
                        .send({})
        expect(resCommand.body.data.name).toBe(recipeMocked.name)
        expect(resCommand.body.data.ingredients).toStrictEqual(recipeMocked.ingredients)
        expect(resCommand.body.data.price).toBe(recipeMocked.price)
        expect(resCommand.body.data.restaurant_id).toStrictEqual(recipeMocked.restaurant_id)
    })

    it('Test GET \"/recipe/name\"', async () => {
        const resId = await request(app)
                            .get(`/recipe/name`)
                            .send({
                                name:recipeMocked2.name,
                                ingredients: recipeMocked2.ingredients,
                                price: recipeMocked2.price,
                                restaurant_id: recipeMocked2.restaurant_id
                            })
        expect(resId.status).toBe(200)
    })

    it('Test GET \"/recipe/\"', async () => {
        const resId = await request(app)
                            .get(`/recipe/`)
                            .send({})
        expect(resId.status).toBe(200)
        expect(resId.body.data.length).toBe(1)
    })

    it('Test PATCH \"/recipe/:id\"', async () => {
        //get the id
        const resId = await request(app)
                        .get(`/recipe/name`)
                        .send({
                            name: recipeMocked.name,
                            ingredients:recipeMocked.ingredients,
                            price: recipeMocked.price,
                            restaurant_id: recipeMocked.restaurant_id
                        })
        //Set user with new model
        let resSet = await request(app)
                        .patch(`/recipe`)
                        .send({
                            _id: resId.body.data._id,
                            recipeMocked2
                        })
        //check if code is correct and message
        expect(resSet.status).toBe(200)
        expect(resSet.body.message).toBe(`the recipe with id ${resId.body.data._id} setted succesfully`)
    })

    it('Test DELETE \"recipe/:id\"', async () => {
        //get the id
        const resId = await request(app)
                        .get(`/recipe/name`)
                        .send({
                            name:recipeMocked2.name,
                            ingredients: recipeMocked2.ingredients,
                            price: recipeMocked2.price,
                            restaurant_id: recipeMocked2.restaurant_id
                        })
        //Check the delete the recipe
        let resDelete = await request(app)
                        .delete(`/recipe/${resId.body.data._id}`)
                        .send({})
        expect(resDelete.body.message).toBe(`recipe ${resId.body.data._id} deleted`)
        expect(resDelete.status).toBe(200)
    })
})