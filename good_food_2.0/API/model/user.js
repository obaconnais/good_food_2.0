const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userShema = new Schema(
    {
        lastname: String, 
        forname: String,
        mail: String,
        address: String 
    }
)

module.exports = mongoose.model('User', userShema)