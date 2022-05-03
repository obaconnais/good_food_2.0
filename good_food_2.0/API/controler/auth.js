const user = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * function for authentication of the application.
 * return 400 if mail or password is null
 * return 400 if user doesn't exist
 * return 401 if password is wrong
 * return a token after verification
 */
module.exports.authenticationSend = async (req, res)=>{
    try{
        const {mail, password} = req.body
        //missing mail, password or twice ?
        if(!mail || !password){
            return res.status(400).json({message: 'missing argument(s)'})
        }
        //search in the db the user that match with mail 
        const userDb = await user.findOne({mail: mail})
        
        //is the user in the db ?    
        if(!userDb)
            return res.status(400).json({message:'the user does not exist'})
        
        //compare password stored in the db to the password received
        let passwordCheck = bcrypt.compareSync(password,userDb.password)
        
        //if test is false, return 401 error 
        if(!passwordCheck)
            return res.status(401).json({message:'password is wrong'})
        //generate a token with id/lastname/forname
        const token = jwt.sign({
            id: userDb.id,
            lastname: userDb.lastname,
            forname: userDb.forname
        },process.env.JWT_SECRET,{expiresIn:process.env.JWT_DURING})

        //return the token
        return res.json({access_token: token})
    }
    catch(err){
        return res.status(500).json({message:'database error'})
    }
}