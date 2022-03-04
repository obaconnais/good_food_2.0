const user = require('../model/user')
const User = require("../controller/user")
const db = require("./db_handle")

describe('mongo db connection',()=>{

beforeAll(async () =>  await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async ()=> await db.closeDatabase())

    let lastname = "IME"
    let forname = "Vincent"
    let mail= "vincent.ime@gmail.com"
    let address = "1 rue de l'épilation 58170 Poil"
    
    it('create user and find user normally', async () => {
        let UserComplet = new user({lastname,forname,mail,address})
        let createUser = await User.createUser(UserComplet)  
        //check if function create work normally
        expect(createUser).toBe(true)
        //check if user was created in the database
        let existeUser = await User.findUser(UserComplet)
        expect(existeUser).toBe(UserComplet)
    }) 
    
    it('create user without lastname', async () => {
        let UserUncomplet = new user({lastname:null,forname,mail,address})
        let createUser = await User.createUser(UserUncomplet)        
        //check if function create work normally
        expect(createUser).toBe(false)
        //check if user was created in the database
        let existeUser = await User.findUser(UserUncomplet)
        expect(existeUser).toBe(null)
    }) 
    
    it('create user without forname', async () => {
        let UserUncomplet = new user({lastname,forname:null,mail,address})
        let createUser = await User.createUser(UserUncomplet)        
        //check if function create work normally
        expect(createUser).toBe(false)
        let existeUser = await User.findUser(UserUncomplet)
        //check if user was created in the database
        expect(existeUser).toBe(null)
    }) 
    
    it('create user without mail', async () => {
        let UserUncomplet = new user({lastname,forname,mail:null,address})
        let createUser = await User.createUser(UserUncomplet)        
        expect(createUser).toBe(false)
        //check if function create work normally
        let existeUser = await User.findUser(UserUncomplet)
        //check if user was created in the database
        expect(existeUser).toBe(null)
    }) 
    
    it('create user without needed fields', async () => {
        let UserUncomplet = new user({lastname:null,forname:null,mail:null,address})
        let createUser = await User.createUser(UserUncomplet)
        //check if function create work normally
        expect(createUser).toBe(false)       
        let existeUser = await User.findUser(UserUncomplet)
        //check if user was created in the database
        expect(existeUser).toBe(null)
    }) 

    it('create user who are already created', async () => {
        let UserComplet = new user({lastname,forname,mail,address})
        let createUser = await User.createUser(UserComplet)
        //testing if user was created
        expect(createUser).toBe(true)
        let alreadyCreatedUser = await User.createUser(UserComplet)
        //testing if function work normally
        expect(alreadyCreatedUser).toBe(false)
    } )
    
    it ('find user but don\'t exist', async () =>{
        let UserComplet = new user({lastname,forname,mail,address})
        let findUser = await User.findUser(UserComplet)
        //testing function findUser work normally
        expect(findUser).toBe(null)
    })
    
    it('find user but user is null', async () => { 
        let nul = null
        let nulUser = await User.findUser(nul)
        //testing function findUser work normally
        expect(nulUser).toBe(null)
    }) 
    
    it('delete a user', async () => {
        let userDeleted = new user({lastname,forname,mail,address})
        console.log("test1")
        await User.createUser(userDeleted)
        console.log("test2")
        await User.deleteUser(userDeleted)
        let deletedUser = await User.findUser(userDeleted)
        expect(deletedUser).toBe(null)
    })

    it('modify user with all field', async ()=>{
        let userToBeModified = new user({lastname: "Bon", forname: "Jean", mail:"jean.bon@gmail.com",address:"1 rue de la boucherie 75600 PORCLAND"})
        await User.createUser(userToBeModified)
        await User.setUser({lastname: "Victor",forname:"Hugo",mail:"victor.huguo@gmail.com",address:"140 grande Rue 25000 Besançon"},userToBeModified)
        userToBeModified.lastname = "Victor"
        userToBeModified.forname = "Hugo"
        userToBeModified.mail = "victor.huguo@gmail.com"
        userToBeModified.address = "140 grande Rue 25000 Besançon"
        let userModified = await User.findUser(userToBeModified)
        expect(userModified).toBe(userToBeModified)
    })

    it('modify user with field', async ()=>{
        //test the lastname field
        let userToBeModified = new user({lastname: "Bon", forname: "Jean", mail:"jean.bon@gmail.com",address:"1 rue de la boucherie 75600 PORCLAND"})
        await User.createUser(userToBeModified)
        await User.setUserLastname({lastname: "Victor"}, userToBeModified)
        userToBeModified.lastname = "Victor"
        let userModified = await User.findUser(userToBeModified)
        expect(userModified).toBe(userToBeModified)
        //test the forname field
        await User.setUserForname({forname: "Hugo"}, userToBeModified)
        userToBeModified.forname = "Hugo"
        userModified = await User.findUser(userToBeModified)
        expect(userModified).toBe(userToBeModified)
        //test the mail field
        await User.setUserMail({mail: "victor.hugo@gmail.com"}, userToBeModified)
        userToBeModified.mail = "victor.hugo@gmail.com"
        userModified = await User.findUser(userToBeModified)
        expect(userModified).toBe(userToBeModified)
        //test the address field
        await User.setUserAddress({address: "140 grande rue 25000 Besançon"}, userToBeModified)
        userToBeModified.address = "140 grande rue 25000 Besançon"
        userModified = await User.findUser(userToBeModified)
        expect(userModified).toBe(userToBeModified)
    })
})
