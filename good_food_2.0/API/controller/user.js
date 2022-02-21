const User = require("../model/user")

module.exports = async function createUser(id, lastname, forname, mail, address){
    try{
        const existingUser = await User.findOne({lastname})
        if(existingUser) throw new Error(`user ${lastname} already exist`)

        const newUser = new User({
            id,
            lastname,
            forname,
            mail,
            address
        })
        await newUser.save()
    }catch(err){throw err}
}