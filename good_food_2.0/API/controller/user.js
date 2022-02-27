const User = require("../model/user")

module.exports.createUser = async (user) => {
    try{
        //testing if needed informations about user are not null
        if(user.lastname == null || user.forname == null || user.mail == null){
            console.log(`user must have lastname, forname and email`)
            return -1
        }

        const existingUser = await User.findOne(user)
        //testing if user not exist
        if(existingUser){
            console.log(`user ${user.lastname} ${user.forname} already exist`)
            return -1
        }
            
        //create user in the db
        await User.create(user).then(()=>{
            console.log(`the user ${user.lastname} ${user.forname} created successfully`)
            return 1
        })
        
    }catch(err){throw err}
}

module.exports.findUser = async (user)=>{
    try{
        const existingUser = await User.findOne(user)
        //testing if user not exist
        if(!existingUser){
            console.log(`user ${user.lastname} ${user.forname} doesn't exist`)
            return null
        }  
        else{
            console.log(`user ${user.lastname} ${user.forname} exist`)
            return user
        }
    }catch(err){}
}