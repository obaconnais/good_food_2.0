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

    it('create user normally', async () => {
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(UserComplet)
    }) 

    it('create user without lastname', async () => {
        UserUncomplet = UserComplet
        UserUncomplet.lastname = null
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(null)
    }) 

     it('create user without forname', async () => {
        UserUncomplet = UserComplet
        UserUncomplet.forname = null
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(null)
    }) 

    it('create user without mail', async () => {
        UserUncomplet = UserComplet
        UserUncomplet.mail = null
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(null)
    }) 

    it('create user without needed fields', async () => {
        UserUncomplet = UserComplet
        UserUncomplet.mail = null
        UserUncomplet.forname = null
        UserUncomplet.lastna = null
        await User.createUser(UserComplet)        
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(null)
    }) 

    it('create user who are already created', async () =>{
        await User.createUser(UserComplet)
        let alreadyCreatedUser = await User.createUser(UserComplet)        
        expect(alreadyCreatedUser).toBe(-1)
    } )
    
    it('find user', async () => {
        console.log("test")
    })
})
