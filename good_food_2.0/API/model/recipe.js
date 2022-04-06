const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeShema = new Schema(
    {
        name: String,
        ingredient: String,
    }
)

module.exports = mongoose.model('Recipe', recipeShema)