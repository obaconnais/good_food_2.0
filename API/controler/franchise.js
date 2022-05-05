const Franchise = require("../model/franchise")

/**
 * module to create a franchise
 */
module.exports.createFranchise = async (req,res) => {
    try{
        const{ name } = req.body;
    
        //testing if needed informations about franchise are defined
        if(!name){
            return res.status(400).json({message:'Franchise\'s name is missing'})
        }

        //testing if this franchise already exists
        const existingFranchise = await Franchise.findOne({name: name})
        if(existingFranchise){
            return res.status(409).json({message:`Franchise ${name} already exists`})
        }

        //create franchise in the db
        await Franchise.create({name})
        return res.status(200).json({message:`Franchise ${name} was created successfully`})
    
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to set a franchise
 */
module.exports.setFranchise = async (req,res) => {
    try {
        const {_id} = req.params
        const {name} = req.body;
        let updateObject = {}
        
        if(!_id)
            return res.status(400).json({message: 'Id is not defined, cannot find any franchise'})
        
        if(!name)
            return res.status(400).json({message: 'Franchise\'s name is not define'})

        const FranchiseGet = await Franchise.findOne({_id:_id})
        if(!FranchiseGet)
            return res.status(404).json({message: `Franchise with id '${_id}' not found`})

        if(name)
            updateObject.name = name

        try {
            await Franchise.updateOne({ _id: _id }, { $set: updateObject }, {runValidators: true})
        } catch(err) {
            if(err.code == 11000) {
                return res.status(409).json({message: `Franchise ${name} already exists`})
            } else if(err.errors.name && err.errors.name.kind == 'regexp') {
                return res.status(400).json({message: `Name is not compliant`})
            } else throw err
        }

        return res.status(200).json({message: 'Franchise was updated successfully'})

    } catch(err) {
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to delete a franchise
 */
module.exports.deleteFranchise = async (req,res) => {
    try {
        const {_id} = req.params

        if(!_id){
            return res.status(400).json({message: 'Id is not defined, cannot find any franchise'})
        }

        let existingFranchise = await Franchise.findOne({_id: _id})

        if(!existingFranchise) {
            return res.status(404).json({message: `Franchise with id : ${_id} wasn't found`})
        } else {
            await Franchise.deleteOne({ _id: _id })
    
            return res.status(200).json({message: 'Franchise was deleted successfully'})
        }

    } catch(err) {
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get a franchise by its name 
 */
module.exports.getFranchiseByName = async (req,res) => {
    try{
        const {name} = req.params

        //testing if name is defined
        if(!name){
            return res.status(400).json({message: 'Name is not defined, cannot find any franchise'})
        }

        const existingFranchise = await Franchise.findOne({ name: name })

        //testing if franchise exists
        if(!existingFranchise){
            return res.status(404).json({message: `Franchise with name : ${name} wasn't found`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingFranchise})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get a franchise by its id 
 */
module.exports.getFranchiseById = async (req,res) => {
    try{
        const {_id} = req.params

        //testing if id is defined
        if(!_id){
            return res.status(400).json({message: 'Id is not defined, cannot find any franchise'})
        }

        const existingFranchise = await Franchise.findOne({ _id: _id })

        //testing if franchise exists
        if(!existingFranchise){
            return res.status(404).json({message: `Franchise with id : ${_id} wasn't found`, found: false})
        }  
        else{
            return res.status(200).json({found: true, data: existingFranchise})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}

/**
 * module to get all franchises 
 */
module.exports.getAllFranchises = async (req,res) => {
    try{
        const franchises = (await Franchise.find({})).map(r => { return {id: r._id, name: r.name} })

        return res.status(200).json({message: 'Franchises were found', data: franchises})
    }catch(err){
        return res.status(500).json({message: 'Internal error'})
    }
}