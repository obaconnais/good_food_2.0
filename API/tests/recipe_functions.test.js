const mockedDB = require("./db_handle")

const request = require('supertest')
const app = require('../app')
const recipe = require('../model/recipe')
const jwt = require('jsonwebtoken')

beforeAll(async () => {
    await mockedDB.connect()
    let recipeMocked = new recipe({
        name: 'Pizza 4 fromages',
        ingredients: ['Camembert', 'Chèvre', 'Raclette', 'Bleu'],
        price: 12
    })
    await recipe.create(recipeMocked)
})

beforeAll(async () => { await mockedDB.connect() })
// afterEach(async () => { await mockedDB.clearDatabase() })
afterAll(async () => { await mockedDB.closeDatabase() })

describe('Recipe tests functions', () => {

    let name = "Pizza 4 fromages"
    let ingredients = ["Camembert", "Chèvre", "Raclette", "Bleu"]
    let price = 12.00

    it('Create normal recipe', async () => {
        let req = httpMock.createRequest({ body: { name, ingredients, price } })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`Recipe ${name} created successfully`)
        expect(status).toBe(200)
    })

    it('Create recipe without ingredients', async () => {
        let req = httpMock.createRequest({ body: { name, price } })
        let res = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        let data = res._getJSONData()
        let status = res._getStatusCode()
        expect(data.message).toBe(`At least on field is missing`)
        expect(status).toBe(400)
    })

    it('Create recipe that already exists', async () => {
        let req = httpMock.createRequest({ body: { name, ingredients, price } })
        let res = httpMock.createResponse()
        let res2 = httpMock.createResponse()
        await recipe.createRecipe(req, res)
        await recipe.createRecipe(req, res2)
        let data = res2._getJSONData()
        let status = res2._getStatusCode()
        expect(data.message).toBe(`Recipe ${name} already exists`)
        expect(status).toBe(409)
    })
})
