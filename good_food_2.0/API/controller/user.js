const User = require("../model/user")

module.exports.createUser = async (user) => {
    try{
        const existingUser = await User.findOne(user)
        //testing if user not exist
        if(existingUser)
            throw new Error(`user ${lastname} already exist`)

        //create user in the db
        await User.create(user).then(console.log(`the user ${user.lastname} ${user.forname} created successfully`))
    }catch(err){throw err}
}

module.exports.findUser = async (user)=>{
    try{

        const existingUser = await User.findOne(user)
        //testing if user not exist
        if(!existingUser)
            return (null,console.log(`user ${user.lastname} ${user.forname} doesn't exist`))
        else{
            console.log(`user ${user.lastname} ${user.forname} exist`)
            return user
        }
    }catch(err){}
}