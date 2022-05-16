const mockedDB = require("./db_handle")

const request = require('supertest')
const app = require('../app')
const httpMock = require('node-mocks-http')
const recipe = require('../controler/recipe')
const recipeModel = require('../model/recipe')
const jwt = require('jsonwebtoken')

// beforeAll(async () => {
//     await mockedDB.connect()
//     await recipe.createRecipe(recipeMocked)
// })

beforeAll(async () => { await mockedDB.connect() })
afterEach(async () => { await mockedDB.clearDatabase() })
afterAll(async () => { await mockedDB.closeDatabase() })

describe('Recipe tests functions', () => {

    let recipeMocked = new recipeModel({
        name: 'Pizza 4 fromages',
        ingredients: ['Camembert', 'Chèvre', 'Raclette', 'Bleu'],
        price: 12.00
    })

    let name = "Pizza 4 fromages"
    let ingredients = ["Camembert", "Chèvre", "Raclette", "Bleu"]
    let price = 12.00

    it('Create normal recipe', async () => {
        // console.log(recipeMocked)
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let data = res._getJSONData()
        console.log("data", data.message)
        let status = res._getStatusCode()
        expect(data.message).toBe(`Recipe ${name} created successfully`)
        expect(status).toBe(201)
    })

    // it('Create recipe without ingredients', async () => {
    //     let req = httpMock.createRequest({ body: { name, price } })
    //     let res = httpMock.createResponse()
    //     await recipe.createRecipe(req, res)
    //     let data = res._getJSONData()
    //     let status = res._getStatusCode()
    //     console.log(status)
    //     expect(data.message).toBe(`At least one field is missing`)
    //     expect(status).toBe(400)
    // })

    // it('Create a recipe that already exists', async () => {
    //     let req = httpMock.createRequest({ body: recipeMocked })
    //     let res = httpMock.createResponse()
    //     let res2 = httpMock.createResponse()
    //     await recipe.createRecipe(req, res)
    //     await recipe.createRecipe(req, res2)
    //     let data = res2._getJSONData()
    //     let status = res2._getStatusCode()
    //     console.log(data)
    //     expect(data.message).toBe(`Recipe ${name} already exists`)
    //     expect(status).toBe(409)
    // })
    // OKAY JUSQUE LA

    // it('GET all recipes', async () => {
    //     let req = httpMock.createRequest()
    //     let res = httpMock.createResponse()
    //     await recipe.getAllRecipes(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(200)
    //     expect(resData.message).toBe('Recipes were found')
    //     expect(resData.data.length).toBe(0)
    // })


    // it('get recipe by name', async () => {
    //     await recipe.createRecipe(
    //         httpMock.createRequest({ body: { name, address, phone, mail, franchiseName, schedule } }),
    //         httpMock.createResponse())
    //     let req = httpMock.createRequest({ params: { name: name } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeByName(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(200)
    //     expect(resData.found).toBe(true)
    //     expect(resData.data.length).toBe(1)
    // })

    // it('get recipe by name but recipe doesn\'t exist', async () => {
    //     let req = httpMock.createRequest({ params: { name: name } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeByName(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(404)
    //     expect(resData.found).toBe(false)
    //     expect(resData.message).toBe(`Recipe ${name} wasn't found`)
    // })

    // it('get recipe by name but name is null', async () => {
    //     let req = httpMock.createRequest({ params: { name: null } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeByName(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(400)
    //     expect(resData.message).toBe('Name is not defined, cannot find any recipe')
    // })


    // it('get recipe by id', async () => {
    //     //Create recipe
    //     await recipe.createRecipe(
    //         httpMock.createRequest({ body: { name, address, phone, mail, franchiseName, schedule } }),
    //         httpMock.createResponse())

    //     //Pick up id from this recipe
    //     let resId = httpMock.createResponse()
    //     await recipe.getRecipeByMail(
    //         httpMock.createRequest({ params: { mail: mail } }),
    //         resId)
    //     let id = resId._getJSONData().data._id
    //     let req = httpMock.createRequest({ params: { _id: id } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeById(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(200)
    //     expect(resData.found).toBe(true)
    // })

    // it('get recipe by id but recipe doesn\'t exist', async () => {
    //     let req = httpMock.createRequest({ params: { _id: '123456789000' } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeById(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(404)
    //     expect(resData.message).toBe(`Recipe with id : 123456789000 wasn't found`)
    //     expect(resData.found).toBe(false)
    // })

    // it('get recipe by id but id is null', async () => {
    //     let req = httpMock.createRequest({ params: { _id: null } })
    //     let res = httpMock.createResponse()
    //     await recipe.getRecipeById(req, res)
    //     let resData = res._getJSONData()
    //     expect(res._getStatusCode()).toBe(400)
    //     expect(resData.message).toBe('Id is not defined, cannot find any recipe')
    // })

})
