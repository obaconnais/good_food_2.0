const User = require("../model/user")

module.exports.createUser = async (req,res) => {
    try{
        const {lastname,forname,mail,address} = req.body
        
        //testing if needed informations about user are not null
        if(!lastname || !forname || !mail || !address){
            return res.status(400).json({message:`at least on field are missing`})
        }

        const existingUser = await User.findOne({mail: mail})
        
        //testing if user not exist
        if(existingUser){
           return res.status(409).json({message:`the user ${lastname} ${forname} already exist`})
        }
        else{
            //create user in the db
            await User.create({lastname,forname,mail,address})
            return res.status('').json({message:`the user ${lastname} ${forname} created successfully`})
        }
    }catch(err){throw err}
}

module.exports.getUser = async (req, res) => {
    try{
        let {mail} = req.body
        //testing if user is null
        if(!mail){
            return res.status(400).json(`missing data, expected an id`)
        } 
        const existingUser = await User.findOne({mail:mail})

        //testing if user not exist
        if(!existingUser){
            return res.status(404).json({message:`user with  mail ${mail} doesn't exist`})
        }  
        else{
            return res.json({data: existingUser})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
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

module.exports.setUserMail = async ({mail}, user)=>{
    try{
        user.mail = mail
        await user.save()
    }catch(err){}   
}

module.exports.setUserAddress = async ({address}, user)=>{
    try{
        user.address = address
        await user.save()
    }catch(err){}   
}