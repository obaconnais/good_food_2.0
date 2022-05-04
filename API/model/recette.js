const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userShema = new Schema(
    {
        name: String, 
        ingredient: String,
        mail: String,
        address: String 
    }
)

module.exports = mongoose.model('User', userShema)