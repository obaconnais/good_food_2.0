const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userShema = new Schema(
    {
        name: String,
        toto: String,
        // ingredient: []
    }
)

module.exports = mongoose.model('Recipe', recipeShema)