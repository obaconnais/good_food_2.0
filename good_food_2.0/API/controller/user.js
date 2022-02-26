const User = require("../model/user")

module.exports.createUser = async (user) => {
    try{
        const existingUser = await User.findOne(user)
        if(existingUser) throw new Error(`user ${lastname} already exist`)
        await User.create(user)
    }catch(err){throw err}
}