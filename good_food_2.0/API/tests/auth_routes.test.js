const request = require('supertest')
const app = require('../app')
const user = require('../model/user')
const mockedDb = require("./db_handle")
const jwt = require('jsonwebtoken')
/**
 * before each test, connect to the mocked database
 */
beforeAll(async () => {
    await mockedDb.connect()
    let userMocked = new user ({
        lastname: "François-Marie", 
        forname: "Arouet", 
        mail: "fm.voltaire@test.com",
        address: "2 rue de l'écrivain 75000 PARIS",
        password: "Voltaire75"
    })
    await user.create(userMocked)
})

 /**
  * after tests passed, disconnect and close the mocked database
  */
 afterAll(async () => {await mockedDb.closeDatabase()})
 
 describe('test route for auth', ()=> {
    it('test login path', async ()=>{
        let userMocked = await user.findOne({mail:"fm.voltaire@test.com" })
        const res = await request(app)
                            .post('/auth')
                            .send({
                                mail:"fm.voltaire@test.com",
                                password: "Voltaire75"
                            })
        const payLoad = jwt.verify(res.body.access_token,process.env.JWT_SECRET) 
        expect(payLoad.id).toBe(userMocked.id)
        expect(payLoad.lastname).toBe(userMocked.lastname)
        expect(payLoad.forname).toBe(userMocked.forname)
    })
 })