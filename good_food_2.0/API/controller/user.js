const User = require("../model/user")

module.exports = async function createUser(lastname, forname, mail, address){
    try{
        const existingUser = await User.findOne({lastname})
        if(existingUser) throw new Error(`user ${lastname} already exist`)

        const newUser = new User({
            lastname,
            forname,
            mail,
            address
        })
        await newUser.save()

        return {
            userId: newUser._id
        }
    }catch(err){throw err}
}