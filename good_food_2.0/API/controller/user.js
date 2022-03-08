const user = require("../model/user")

module.exports.createUser = async (req,res) => {
    try{
        const {lastname,forname,mail,address} = req.body
        
        //testing if needed informations about user are not null
        if(!lastname || !forname || !mail || !address){
            return res.status(400).json({message:`at least on field are missing`})
        }

        const existingUser = await user.findOne({mail: mail})
        
        //testing if user not exist
        if(existingUser){
           return res.status(409).json({message:`the user ${lastname} ${forname} already exist`})
        }
        else{
            //create user in the db
            await user.create({lastname,forname,mail,address})
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
        const existingUser = await user.findOne({mail:mail})

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
            return res.status(204).json({message: `user with id ${_id} deleted successfully`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.setUser = async (req, res) => {
    try{
        let {_id,lastname,forname,mail,address}=req.body
        if(!lastname || !forname || !mail || ! address)
            return res.status(404).json({message:`Missing data`})
        let filter = {_id: _id} 
        await user.findOneAndUpdate(filter,{lastname: lastname, forname:forname, mail: mail, address:address}, {new: true})
        return res.status(204).json({message:`user ${lastname} ${forname} modified successfully`})
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }       
}
