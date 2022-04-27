const Restaurant = require("../model/restaurant")

/**
 * module to creat a restaurant
 */
module.exports.createRestaurant = async (req,res) => {
    try{
        const{ name, address, franchised, telephone, schedule, mail } = req.body;
    
        //testing if needed informations about restaurant are defined
        if(!name || !address|| !telephone || !mail || !franchised || !schedule){
            return res.status(400).json({message:'At least one field is missing'})
        }
        schedule = JSON.parse(schedule);

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
        let {id = req.params.id
        if(!id)
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})

        if(!req.body.name && !req.body.address && !req.body.telephone && !req.body.mail && !req.body.franchised && !req.body.schedule)
            return res.status(400).json({message: 'Bad request'})


        if(req.body.name)
            await Restaurant.updateOne({ _id: id }, { $set: {name: req.body.name} })

        if(req.body.address)
            await Restaurant.updateOne({ _id: id }, { $set: {address: req.body.address} })

        if(req.body.telephone)
            await Restaurant.updateOne({ _id: id }, { $set: {telephone: req.body.telephone} })

        if(req.body.mail)
            await Restaurant.updateOne({ _id: id }, { $set: {mail: req.body.mail} })

        if(req.body.franchised)
            await Restaurant.updateOne({ _id: id }, { $set: {franchised: req.body.franchised} })

        if(req.body.schedule)
            await Restaurant.updateOne({ _id: id }, { $set: {schedule: req.body.schedule} })

        return res.status(200).json({message: 'OK'})

    } catch(err) {
        return res.status(500).json({message: 'Erreur interne'})
    }
}

/**
 * module to delete a restaurant
 */
module.exports.deleteRestaurant = async (req,res) => {
    try {
        let id = req.params.id
        if(!id){
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})
        }

        await Restaurant.deleteOne({ _id: id })

        return res.status(200).json({message: 'OK'})

    } catch(err) {
        return res.status(500).json({message: 'Erreur interne'})
    }
}

/**
 * module to get a restaurant by its name 
 */
module.exports.getRestaurantByName = async (req,res) => {
    try{
        let name = req.params.name
        //testing if name is defined
        if(!name){
            return res.status(400).json({message: 'Name is not defined, cannot find any restaurant'})
        }
        let existingRestaurants = (await Restaurant.find({ name: {$regex: name, $options: 'i'} })).map(r => { return {id: r._id, name: r.name} })
        
        //testing if restaurant exists
        if(existingRestaurants.length == 0){
            return res.status(200).json({message: `No restaurant found as ${name}`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingRestaurants})
        }
    }catch(err){
        return res.status(500).json({message: 'Erreur interne'})
    }
}

/**
 * module to get a restaurant by its id 
 */
module.exports.getRestaurantById = async (req,res) => {
    try{
        let id = req.params.id

        //testing if name is defined
        if(!id){
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})
        }
        const existingRestaurant = await Restaurant.findOne({ _id: id })

        //testing if restaurant exists
        if(!existingRestaurant){
            return res.status(200).json({found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingRestaurant})
        }
    }catch(err){
        return res.status(500).json({message: 'Erreur interne'})
    }
}

/**
 * module to get a restaurant by its mail
 */
module.exports.getRestaurantByMail = async (req,res) => {

}

/**
 * module to get all restaurants 
 */
module.exports.getAllRestaurants = async (req,res) => {
    try{
        const restaurants = (await Restaurant.find({})).map(r => { return {id: r._id, name: r.name} })

        return res.status(200).json({message: 'OK', data: restaurants})
    }catch(err){
        return res.status(500).json({message: 'Erreur interne'})
    }
}

