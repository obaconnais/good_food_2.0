const user = require("../model/user")

module.exports.createUser = async (req,res) => {
    try{
        const {lastname,forname,mail,address,password} = req.body
        
        //testing if needed informations about user are not null
        if(!lastname || !forname || !mail || !address || !password){
            return res.status(400).json({message:`at least on field are missing`})
        }

        const existingUser = await user.findOne({mail: mail})
        
        //testing if user not exist
        if(existingUser){
           return res.status(400).json({message:`the user ${lastname} ${forname} already exist`})
        }
        else{
            //create user in the db
            await user.create({lastname,forname,mail,address,password})
            return res.status(200).json({message:`the user ${lastname} ${forname} created successfully`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.getUser = async (req, res) => {
    try{
        let {_id} = req.body
        //testing if user is null
        if(!_id){
            return res.status(400).json({message:`Missing data, expected an _id`})
        } 
        const existingUser = await user.findOne({_id:_id})

        //testing if user not exist
        if(!existingUser){
            return res.status(404).json({message:`user with id ${_id} doesn't exist`})
        }  
        else{
            return res.status(200).json({data: existingUser})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

//@toFix develop many test code/ not done actually
module.exports.getUserId = async (req, res) => {
    let{mail} = req.body
    let doc = await user.findOne({mail: mail})
    return res.status(200).json({data: doc._id})
}   

module.exports.deleteUser = async (req,res) => {
    try{
        let {_id} = req.body
        if(!_id)
            return res.status(400).json({message:`Missing data, expected an id`})    
        else{
            await user.deleteOne({_id: _id})
            return res.status(200).json({message: `user with id ${_id} deleted successfully`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.setUser = async (req, res) => {
    try{
        let {_id,lastname,forname,mail,address}=req.body
        let userGet = await user.findOne({_id:_id})
        if(!_id){
            return res.status(400).json({message: `user with id ${_id} doesn't exist`})
        }
        if(lastname){
            userGet.lastname = lastname
            await userGet.save()
        }
        if(forname){
            userGet.forname = forname
            await userGet.save()
        }
        if(mail){
            userGet.mail = mail
            await userGet.save()
        }
        if(address){
            userGet.address = address
            await userGet.save()
        }
        return  res.status(200).json({message:`User with id ${_id} updated successfully`})
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }       
}
