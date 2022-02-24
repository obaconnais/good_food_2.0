const user = require("../model/user")
const db = require("./db_config")

beforeAll(async () => db.connect())
afterEach(async () => db.clearDatabase())
afterAll(async ()=> db.closeDatabase())

describe('test',()=>{
    it('first user', async done => {
        let lastname = "BACONNAIS"
        let forname = "Olivier"
        let mail= "olivier.baconnais@icloud.com"
        let address = "2 rue saint Simon 64000 PAU"
        
        expect(User.lastname).toEqual(lastname)
        expect(User.forname).toEqual(forname)
        expect(User.mail).toEqual(mail)
        exect(User.address).toEqual(address)

        done()
    }) 
})