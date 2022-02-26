const user = require('../model/user')
const User = require("../controller/user")
const db = require("./db_config")

describe('test',()=>{

beforeAll(async () =>  db.connect())
afterEach(async () => db.clearDatabase())
afterAll(async ()=> db.closeDatabase())

    let lastname = "BACONNAIS"
    let forname = "Olivier"
    let mail= "olivier.baconnais@icloud.com"
    let address = "2 rue saint Simon 64000 PAU"
    const UserComplet = new user({lastname,forname,mail,address})

    it('first user', async () => {
        let existeUser = User.createUser(UserComplet)
    }) 
})