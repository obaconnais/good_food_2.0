const Restaurant = require("../model/restaurant")
const Franchise = require('../model/franchise')

/**
 * module to create a restaurant
 */
module.exports.createRestaurant = async (req,res) => {
    try{
        const{ name, address, franchiseName, phone, schedule, mail } = req.body;
        let createObject = {name, address, phone, schedule, mail}

        //testing if needed informations about restaurant are defined
        if(!name || !address|| !phone || !mail || !schedule){
            return res.status(400).json({message:'At least one field is missing'})
        }

        //testing if this restaurant already exists
        const existingRestaurants = await Restaurant.findOne({mail: mail})
        if(existingRestaurants){
            return res.status(409).json({message:`Restaurant ${name} already exists`})
        }

        if(franchiseName) {
            const existingFranchise = await Franchise.findOne({name: franchiseName})
            if(!existingFranchise) {
                return res.status(404).json({message: `Unable to create restaurant franchised to ${franchiseName} (not found)`})
            }
            //create restaurant in the db
            createObject.franchisedGroup = existingFranchise._id
        }
        
        //create restaurant in the db
        await Restaurant.create(createObject)
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
        const {name, address, phone, schedule, mail} = req.body;
        let updateObject = {}
        
        if(!_id)
            return res.status(400).json({message: 'Id is not defined, cannot find any restaurant'})
        
        if(!name && !address && !phone && !mail && !schedule)
            return res.status(400).json({message: 'None element defined'})
        
        const restaurantGet = await Restaurant.findOne({_id:_id})
        if(!restaurantGet)
            return res.status(404).json({message: `Restaurant with id '${_id}' not found`})

        if(name)
            updateObject.name = name

        if(address)
            updateObject.address = address
        
        if(phone)
            updateObject.phone = phone
        
        if(mail)
            updateObject.mail = mail
        
        if(schedule)
            updateObject.schedule = schedule

        try {
            await Restaurant.updateOne({ _id: _id }, { $set: updateObject }, {runValidators: true})
        } catch(err) {
            if(err.code == 11000) {
                return res.status(409).json({message: `Restaurant with mail ${mail} already exists`})
            } else if(err.errors.name && err.errors.name.kind == 'regexp') {
                return res.status(400).json({message: `Name is not compliant`})
            } else if(err.errors.mail && err.errors.mail.kind == 'regexp') {
                return res.status(400).json({message: `Mail is not compliant`})
            } else if(err.errors.phone && err.errors.phone.kind == 'regexp') {
                return res.status(400).json({message: `Phone is not compliant`})
            } else throw err
        }

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

        let existingRestaurant = await Restaurant.findOne({_id: _id})

        if(!existingRestaurant) {
            return res.status(404).json({message: `Restaurant with id : ${_id} wasn't found`})
        } else {
            await Restaurant.deleteOne({ _id: _id })
    
            return res.status(200).json({message: 'Restaurant was deleted successfully'})
        }

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
        const restaurants = (await Restaurant.find({})).map(r => { return {id: r._id, name: r.name, address:r.address} })
        return res.status(200).json({message: 'Restaurants were found', data: restaurants})
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get Restaurants by city
 */
module.exports.getRestaurantByCity = async (req,res) => {
    try{
        let result = new Set()
        let zipCodes = []
        zipCodes = req.body
        if(zipCodes.length ==0)
            return res.status(400).json({message:'zipCodes is empty'})
        for (const postCode of zipCodes){
            let findRes = await Restaurant.find({'address.postCode': {$regex: postCode, $options:'i'}})
            if(findRes.length!=0){
                findRes.forEach(elt=>{
                    result.add(elt)
                })
            }
        }
        let resArray = Array.from(result)
        return res.status(200).json({found:true, data:resArray})
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    } 
}
