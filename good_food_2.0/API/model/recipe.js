const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeShema = new Schema(
    {
        name: String,
        ingredients: {
            name: String,
            quantity: Number
        }
    }
)

module.exports = mongoose.model('Recipe', recipeShema)