const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeShema = new Schema(
    {
        name: String,
        ingredients: [String],
        price: Number
    }
)

module.exports = mongoose.model('Recipe', recipeShema)