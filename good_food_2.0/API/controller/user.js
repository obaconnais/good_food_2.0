const User = require("../model/user")

module.exports.createUser = async (user) => {
    try{
        //testing if needed informations about user are not null
        if(user.lastname == null || user.forname == null || user.mail == null){
            console.log(`user must have lastname, forname and email`)
            return false
        }

        const existingUser = await User.findOne(user)
        
        //testing if user not exist
        if(existingUser){
            console.log(`user ${user.lastname} ${user.forname} already exist`)
            return false
        }
        else{
            //create user in the db
            await User.create(user).then(()=>{
                console.log(`the user ${user.lastname} ${user.forname} created successfully`)
            })
            return true
        }

        
    }catch(err){throw err}
}

module.exports.findUser = async (user) => {
    try{
        //testing if user is null
        if(user == null){
            console.log(`user is null, cannot find it`)
            return null
        }
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

module.exports.deleteUser = async (user) => {
    try{
        await User.deleteOne(user)
        console.log(`user ${user.lastname} ${user.forname} deleted`)
    }catch(err){}
}

module.exports.setUser = async ({lastname,forname,mail,address},user) => {
    try{
        user.lastname = lastname
        user.forname = forname
        user.mail = mail
        user.address = address
        await user.save()
    }catch(err){}       
}

module.exports.setUserLastname = async ({lastname}, user)=>{
    try{
        user.lastname = lastname
        await user.save()
    }catch(err){}   
}

module.exports.setUserForname = async ({forname}, user)=>{
    try{
        user.forname = forname
        await user.save()
    }catch(err){}   
}