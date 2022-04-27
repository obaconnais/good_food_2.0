const Restaurant = require("../model/restaurant")

/**
 * module to create a restaurant
 */
module.exports.createRestaurant = async (req,res) => {
    try{
        const{ name, address, franchised, telephone, schedule, mail } = req.body;
    
        //testing if needed informations about restaurant are defined
        if(!name || !address|| !telephone || !mail || !franchised || !schedule){
            return res.status(400).json({message:'At least one field is missing'})
        }

        //testing if this restaurant already exists
        const existingRestaurants = await Restaurant.findOne({mail: mail});
        if(existingRestaurants){
            return res.status(409).json({message:`Restaurant ${name} already exists`})
        }

        //create restaurant in the db
        await Restaurant.create({name,address,telephone,mail,franchised,schedule})
        return res.status(200).json({message:`Restaurant ${name} was created successfully`})
    
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to set a restaurant
 */
module.exports.setRestaurant = async (req,res) => {
    try {
        const {_id} = req.params
        const {name, address, franchised, telephone, schedule, mail} = req.body;
        const restaurantGet = await Restaurant.findOne({_id:_id})

        if(!_id)
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})

        if(!name && !address && !telephone && !mail && !franchised && !schedule)
            return res.status(400).json({message: 'Bad request'})

        if(name)
            await Restaurant.updateOne({ _id: _id }, { $set: {name: name} })

        if(address)
            await Restaurant.updateOne({ _id: _id }, { $set: {address: address} })

        if(telephone)
            await Restaurant.updateOne({ _id: _id }, { $set: {telephone: telephone} })

        if(mail)
            await Restaurant.updateOne({ _id: _id }, { $set: {mail: mail} })

        if(franchised)
            await Restaurant.updateOne({ _id: _id }, { $set: {franchised: franchised} })

        if(schedule)
            await Restaurant.updateOne({ _id: _id }, { $set: {schedule: schedule} })

        return res.status(200).json({message: 'Restaurant was updated successfully'})

    } catch(err) {
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to delete a restaurant
 */
module.exports.deleteRestaurant = async (req,res) => {
    try {
        const {_id} = req.params

        if(!_id){
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})
        }

        await Restaurant.deleteOne({ _id: _id })

        return res.status(200).json({message: 'Restaurant was deleted successfully'})

    } catch(err) {
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get a restaurant by its name 
 */
module.exports.getRestaurantByName = async (req,res) => {
    try{
        const {name} = req.params

        //testing if name is defined
        if(!name){
            return res.status(400).json({message: 'Name is not defined, cannot find any restaurant'})
        }

        const existingRestaurants = (await Restaurant.find({ name: {$regex: name, $options: 'i'} })).map(r => { return {id: r._id, name: r.name} })
        
        //testing if restaurant exists
        if(existingRestaurants.length == 0){
            return res.status(404).json({message: `Restaurant ${name} wasn't found`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingRestaurants})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get a restaurant by its id 
 */
module.exports.getRestaurantById = async (req,res) => {
    try{
        const {_id} = req.params

        //testing if id is defined
        if(!_id){
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})
        }

        const existingRestaurant = await Restaurant.findOne({ _id: _id })

        //testing if restaurant exists
        if(!existingRestaurant){
            return res.status(404).json({message: `Restaurant with id : ${_id} wasn't found`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingRestaurant})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get a restaurant by its mail
 */
module.exports.getRestaurantByMail = async (req,res) => {
    try{
        const {mail} = req.params

        //testing if mail is defined
        if(!mail){
            return res.status(400).json({message: 'Mail is not defined, cannot find any restaurant'})
        }

        const existingRestaurant = await Restaurant.findOne({ mail: mail })

        //testing if restaurant exists
        if(!existingRestaurant){
            return res.status(404).json({message: `Restaurant with mail : ${mail} wasn't found`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingRestaurant})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get all restaurants 
 */
module.exports.getAllRestaurants = async (req,res) => {
    try{
        const restaurants = (await Restaurant.find({})).map(r => { return {id: r._id, name: r.name} })

        return res.status(200).json({message: 'Restaurants were found', data: restaurants})
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

