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
            return res.status(204).json({message:`the user ${lastname} ${forname} created successfully`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.getUser = async (req, res) => {
    try{
        let {mail} = req.body
        //testing if user is null
        if(!mail){
            return res.status(400).json({message:`Missing data, expected a mail`})
        } 
        const existingUser = await User.findOne({mail:mail})

        //testing if user not exist
        if(!existingUser){
            return res.status(404).json({message:`user with  mail ${mail} doesn't exist`})
        }  
        else{
            return res.status(200).json({data: existingUser})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.deleteUser = async (req,res) => {
    try{
        let {mail} = req.body
        if(!mail)
            return res.status(400).json({message:`Missing data, expected a mail`})    
        else{
            await User.deleteOne({mail: mail})
            return res.status(204).json({message: `user with mail ${mail} deleted successfully`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.setUser = async (req, res) => {
    try{
        let {lastname,forname,mail,address}=req.body
        let existingUser = User.findOne({mail})
        if(lastname)
            existingUser.lastname = lastname
        if(forname)
            existingUser.forname = forname
        if(mail)
            existingUser.mail = mail
        if(address)
            existingUser.address =mail
        existingUser.setUpdate({lastname,forname,mail,address})
        return res.status(204).json({message:`user ${lastname} ${forname} modified successfully`})
    }catch(err){}       

}
