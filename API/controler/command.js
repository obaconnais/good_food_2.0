const command = require("../model/command")

/**
 * method to create a command in the database
 * if the one of field are not present, return 400
 * if the command already exist in the database, return 400
 * if a problem in the database, return 500
 * return 201 if the command created normally
 */
module.exports.createCommand = async (req,res) => {
    try{
        const {kind,restaurant,paymentMethod, date, products, price,currency,state} = req.body
        // console.log(kind, restaurant, paymentMethod, date, products, price, currency,state)
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

/**
 * method to create a command in the database
 * if the one of field are not present, return 400
 * if a problem in the database, return 500
 * return 200 and the command if the command created normally
 */
module.exports.getCommand = async (req, res) => {
    try{
        const {_id} = req.body
        
        if(!_id)
            return res.status(400).json({message: `at least one field are missing`})
        
        let findCommand = await command.findOne({body:{_id: _id}})
        if(!findCommand)
            return res.status(400).json({message: `command not found`})
        
        return res.status(200).json({data: findCommand})        
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}

//@toFix develop many test code/ not done actually
module.exports.getCommandId = async (req, res) => {
    try{  
        const {kind,restaurant,paymentMethod,date,products,price,currency,state} = req.body
        let doc = await command.findOne({kind,restaurant,paymentMethod,date,products,price,currency,state})
        if(!doc)
            return res.status(400).json({message: 'Command not found'})
        return res.status(200).json({data:doc._id})
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
}   

/**
 * method to create a command in the database
 * if the one of field are not present, return 400
 * if the command already exist in the database, return 400
 * if a problem in the database, return 500
 * return 201 if the command created normally
 */
module.exports.deleteCommand = async (req,res) => {
    try{
        const {_id} =req.body
        if(!_id)
            return res.status(400).json({message: "id are missing"})
        
        let findCommand = await command.findOne({_id})
        
        if(!findCommand)
            return res.status(400).json({message:"command are not exist"})
        
        await command.deleteOne({_id:_id})
        return res.status(201).json({message: `command with id ${_id} deleted successfully`})
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }
} 

/**
 * method to set a command in the database
 * if command not found in the database, return 400
 * if a problem in the database, return 500
 * return 200 if the command setted normally
 */
module.exports.setCommand = async (req, res) => {
    try{
        const {_id, kind, restaurant, paymentMethod, date, products, price, currency, state} = req.body
        let findCommand = await command.findOne({_id: _id})
        if(!findCommand)
            return res.status(400).json("command not found")
        if(kind)
            findCommand.kind = kind
        if(restaurant)
            findCommand.restaurant = restaurant
        if(paymentMethod)
            findCommand.paymentMethod = paymentMethod
        if(date)
            findCommand.date = date
        if(products)
            findCommand.products = products
        if(price)
            findCommand.price = price
        if(currency)
            findCommand.currency = currency
        if(state)
            findCommand.state = state
         
        await findCommand.save()
        return res.status(200).json('Command setted successfully')
    }catch(err){
        return res.status(500).json({message:`Database error`})
    }       
}
