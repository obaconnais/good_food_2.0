const command = require("../model/commmand")

module.exports.createCommand = async (req,res) => {
    try{
        const {kind,restaurant,paymentMethod, date, products, price,currency,state} = req.body
        if(!kind || !restaurant || !paymentMethod || !date || !products || !price || !currency || !state)
        return res.status(400).json({message:`at least on field are missing`})
        
        const existingCommand = await command.findOne({kind:kind, restaurant: restaurant, paymentMethod:paymentMethod, date:date, products:products, price: price, currency:currency,state:state})
        if(existingCommand)
            return res.status(400).json({message:`the command with number ${existingCommand._id} already exist`})
        
        else{
            await command.create({kind,restaurant,paymentMethod, date, products,price,currency,state})
            return res.status(201).json({message:`command created`})
        }
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.getCommand = async (req, res) => {
    try{
        
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

//@toFix develop many test code/ not done actually
module.exports.getCommandId = async (req, res) => {
    try{  
        const {kind,restaurant,paymentMethod,date,products,price,currency,state} = req.body
        let doc = await command.findOne({kind,restaurant,paymentMethod,date,products,price,currency,state})
        return res.status(200).json({data:doc._id})
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}   

module.exports.deleteCommand = async (req,res) => {
    try{

    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

module.exports.setCommand = async (req, res) => {
    try{

    }catch(err){
        return res.status(500).json({message:`Database error`})
    }       
}
