/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const request = require('supertest')
const app = require('../app')
const mockedDb = require("./db_handle")

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

describe('Test global path', () => {
    
    it('test path \"get/\"', async () => {
        const res = await request(app)
                        .get('/')
        expect(res.text).toBe("server is online")
    })

})