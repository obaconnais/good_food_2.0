const restaurant = require("../model/restaurant")
const Restaurant = require("../model/restaurant")

// Create restaurant
module.exports.createRestaurant = async (req,res) => {
    try{
        const name = req.query.name,
        address = req.query.address,
        telephone = req.query.telephone,
        mail = req.query.mail,
        franchised = req.query.franchised === "true",
        schedule = JSON.parse(req.query.schedule)
        
        //testing if needed informations about restaurant are defined
        if(!name || !address|| !telephone || !mail || !franchised || !schedule){
            return res.status(400).json({message:'At least one field is missing'})
        }
        
        //create restaurant in the db
        await Restaurant.create({name,address,telephone,mail,franchised,schedule})
        return res.status(200).json({message:`Restaurant ${name} was created successfully`})
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

// Update restaurant
module.exports.updateRestaurant = async (req,res) => {
    try {
        let id = req.params.id
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

// Delete restaurant
module.exports.removeRestaurant = async (req,res) => {
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

// Find restaurants
module.exports.findRestaurantByName = async (req,res) => {
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

module.exports.findRestaurantById = async (req,res) => {
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

module.exports.findAllRestaurants = async (req,res) => {
    try{
        const restaurants = (await Restaurant.find({})).map(r => { return {id: r._id, name: r.name} })

        return res.status(200).json({message: 'OK', data: restaurants})
    }catch(err){
        return res.status(500).json({message: 'Erreur interne'})
    }
}

