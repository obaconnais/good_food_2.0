const user = require('../model/user')
const User = require("../controller/user")
const db = require("./db_handle")

describe('mongo db connection',()=>{

beforeAll(async () =>  await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async ()=> await db.closeDatabase())

    let lastname = "BACONNAIS"
    let forname = "Olivier"
    let mail= "olivier.baconnais@icloud.com"
    let address = "2 rue saint Simon 64000 PAU"
    const UserComplet = new user({lastname,forname,mail,address})

    it('first user', async () => {
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(UserComplet)
    }) 
})
