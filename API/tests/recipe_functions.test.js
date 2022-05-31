const mockedDB = require("./db_handle")
const httpMock = require('node-mocks-http')
const recipe = require('../controler/recipe')
const recipeModel = require('../model/recipe')


beforeAll(async () => { await mockedDB.connect() })
afterEach(async () => { await mockedDB.clearDatabase() })
afterAll(async () => { await mockedDB.closeDatabase() })

describe('Recipe tests functions', () => {

    let recipeMocked = new recipeModel({
        name: 'Pizza 4 fromages',
        ingredients: ['Camembert', 'Chèvre', 'Raclette', 'Bleu'],
        price: 12.00,
        restaurant_id: ["628bd294ebd84a3f859914b6","628bd294ebd84a3f859914b7"]
    })

    let recipeMocked2 = new recipeModel({
        name: 'Pizza 5 fromages',
        ingredients: ['Camembert', 'Chèvre', 'Raclette', 'Bleu', 'Gruyère'],
        price: 12.00,
        restaurant_id: ["628bd294ebd84a3f859914b8"]
    })

    let name = "Pizza 4 fromages"
    let ingredients = ["Camembert", "Chèvre", "Raclette", "Bleu"]
    let price = 12.00

    it('Create normal recipe', async () => {
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Recipe ${name} created successfully`)
        expect(status).toBe(201)
    })

    it('Create recipe without ingredients', async () => {
        let req = httpMock.createRequest({ body: { name: name, price: price } })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least one field is missing`)
        expect(status).toBe(400)
    })

    it('Create a recipe that already exists', async () => {
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        await recipe.createRecipe(req, res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`Recipe ${name} already exists`)
        expect(status).toBe(409)
    })

    it('GET all recipes', async () => {
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.getAllRecipes(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(200)
        expect(resData.data.length).toBe(0)
    })


    it('get recipe by name', async () => {
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let req2 = httpMock.createRequest({ body: { name: name } })
        let res2 = httpMock.createResponse()
        await recipe.findRecipe(req2, res2)
        let resData = res2._getJSONData()
        expect(res2._getStatusCode()).toBe(200)
        expect(resData.found).toBe(true)
    })

    it('get recipe by name but recipe doesn\'t exist', async () => {
        let req = httpMock.createRequest({ body: { name: name } })
        let res = httpMock.createResponse()
        await recipe.findRecipe(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.found).toBe(false)
        expect(resData.message).toBe(`Recipe ${name} wasn't found`)
    })

    it('get recipe by name but name is null', async () => {
        let req = httpMock.createRequest({ body: { name: null } })
        let res = httpMock.createResponse()
        await recipe.findRecipe(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe(`at least one field are missing`)
    })

    it('get recipe by id', async () => {
        //Create recipe
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)

        let req2 = httpMock.createRequest({ body: { name: name } })
        let res2 = httpMock.createResponse()
        await recipe.findRecipe(req2, res2)
        let resData = res2._getJSONData()

        let id = resData.data._id
        let req3 = httpMock.createRequest({ params: { id: id } })
        let res3 = httpMock.createResponse()
        await recipe.getRecipeById(req3, res3)
        expect(res3._getStatusCode()).toBe(200)
        let resData2 = res3._getJSONData()
        expect(resData2.found).toBe(true)
    })

    it('get recipe by id but recipe doesn\'t exist', async () => {
        let req = httpMock.createRequest({ params: { id: '123456789000' } })
        let res = httpMock.createResponse()
        await recipe.getRecipeById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(404)
        expect(resData.message).toBe(`Recipe with id : 123456789000 wasn't found`)
        expect(resData.found).toBe(false)
    })

    it('get recipe by id but id is null', async () => {
        let req = httpMock.createRequest({ params: { id: null } })
        let res = httpMock.createResponse()
        await recipe.getRecipeById(req, res)
        let resData = res._getJSONData()
        expect(res._getStatusCode()).toBe(400)
        expect(resData.message).toBe('Id is not defined, cannot find any recipe')
    })

    it('Delete recipe', async () => {
        let req = httpMock.createRequest({ body: recipeMocked })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)

        let req2 = httpMock.createRequest({ body: recipeMocked })
        let res2 = httpMock.createResponse()
        await recipe.findRecipe(req2, res2)
        let resData = res2._getJSONData()

        let id = resData.data._id
        let req3 = httpMock.createRequest({ params: { _id: id }})
        let res3 = httpMock.createResponse()
        await recipe.deleteRecipe(req3, res3)
        expect(res2._getStatusCode()).toBe(200)
    })


    it('Set recipe', async () => {
        let req = httpMock.createRequest({ body: recipeMocked2 })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req,res)
        let reqFind = httpMock.createRequest({ body: recipeMocked2 })
        let resFind = httpMock.createResponse()
        await recipe.findRecipe(reqFind,resFind)
        let recipeData = resFind._getJSONData().data
        let req2 = httpMock.createRequest({ body:{_id:recipeData._id,name:recipeMocked.name,ingredients:recipeMocked.ingredients, price:recipeMocked.price, restaurant_id: recipeMocked.restaurant_id }})
        let res2 = httpMock.createResponse()
        await recipe.setRecipe(req2, res2)
        expect(res2._getJSONData().message).toBe(`the recipe with id ${recipeData._id} setted succesfully`)
        expect(res2._getStatusCode()).toBe(200)
    })

    it('Set recipe but id is null', async () => {
        let req2 = httpMock.createRequest({ body:{_id:null,name:recipeMocked2.name,ingredients:recipeMocked2.ingredients, price:recipeMocked2.price, restaurant_id: recipeMocked2.restaurant_id }})
        let res2 = httpMock.createResponse()
        await recipe.setRecipe(req2, res2)
        expect(res2._getStatusCode()).toBe(400)
        expect(res2._getJSONData().message).toBe("Id is null, can not find any recipe")
    })

    it('Set recipe but not found', async () => {
        let req2 = httpMock.createRequest({ body:{_id:"627c2d155d9ba56b3494bfa8",name:recipeMocked2.name,ingredients:recipeMocked2.ingredients, price:recipeMocked2.price, restaurant_id: recipeMocked2.restaurant_id }})
        let res2 = httpMock.createResponse()
        await recipe.setRecipe(req2, res2)
        expect(res2._getStatusCode()).toBe(400)
        expect(res2._getJSONData().message).toBe("no recipe found")
    })

})
