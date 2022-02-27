const user = require('../model/user')
const User = require("../controller/user")
const db = require("./db_handle")
const { deleteOne } = require('../model/user')

describe('mongo db connection',()=>{

beforeAll(async () =>  await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async ()=> await db.closeDatabase())

    let lastname = "IME"
    let forname = "Vincent"
    let mail= "vincent.ime@gmail.com"
    let address = "1 rue de la désiré 58170 Poil"
    const UserComplet = new user({lastname,forname,mail,address})

    it('create user and find user normally', async () => {
        let createUser = await User.createUser(UserComplet)  
        //check if function create work normally
        expect(createUser).toBe(true)
        //check if user was created in the database
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(UserComplet)
    }) 
    
    it('create user without lastname', async () => {
        UserUncomplet = UserComplet
        UserUncomplet.lastname = null
        let createUser = await User.createUser(UserComplet)        
        //check if function create work normally
        expect(createUser).toBe(false)
        //check if user was created in the database
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
        UserUncomplet.lastname = null
        let createUser = await User.createUser(UserComplet)
        expect(createUser).toBe(false)       
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(null)
    }) 

    it('create user who are already created', async () => {
        await User.createUser(UserComplet)
        let alreadyCreatedUser = await User.createUser(UserComplet)        
        expect(alreadyCreatedUser).toBe(false)
    } )
    
    it ('find user but don\'t exist', async () =>{
        let findUser = await User.findUser(UserComplet)
        expect(findUser).toBe(null)
    })
    
    it('find user but user is null', async () => { 
        let nul = null
        let nulUser = await User.findUser(nul)
        expect(nulUser).toBe(null)
    }) 
    
    it('delete user normally', async () => { 
        await User.createUser(UserComplet)
        await User.deleteUser(UserComplet)
        let deleteUser = await User.findUser(UserComplet)
        expect(deleteUser).toBe(null)
    }) 
    
})
