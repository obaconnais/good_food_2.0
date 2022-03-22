const Restaurant = require("../model/restaurant")

module.exports.createRestaurant = async (req,res) => {
    try{
        const name = req.query.name,
        address = req.query.address,
        telephone = req.query.telephone,
        mail = req.query.mail,
        franchised = req.query.franchised === "true",
        schedule = JSON.parse(req.query.schedule)
        
        console.log(name,address,telephone,mail,franchised,schedule)
        //testing if needed informations about restaurant are defined
        if(!name || !address|| !telephone || !mail || !franchised || !schedule){
            return res.status(400).json({message:`At least one field is missing`})
        }
        
        //create restaurant in the db
        await Restaurant.create({name,address,telephone,mail,franchised,schedule})
        return res.status(200).json({message:`Restaurant ${name} was created successfully`})
    }catch(err){
        console.log(err)
        res.status(500).json({message: `Internal error`})
    }
}

module.exports.findRestaurantByName = async (req,res) => {
    try{
        let name = req.params.name

        //testing if name is defined
        if(!name){
            res.status(400).json({message: `Restaurant is not defined, cannot find it`})
        }
        const existingRestaurant = await Restaurant.findOne({
            name: name
        })

        //testing if restaurant exists
        if(!existingRestaurant){
            res.status(200).json({message: `Restaurant ${name} doesn't exist`})
        }  
        else{
            res.status(200).json({message: `Restaurant ${name} exists`})
        }
    }catch(err){}
}