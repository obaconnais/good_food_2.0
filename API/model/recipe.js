const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeShema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Required field'],
        },
        ingredients: {
            type: [String],
            required: [true, 'Required field'],
        },
        price: {
            type: Number,
            required: [true, 'Required field'],
        },
        restaurant_id: {
            type: [String],
            required: [true, 'Required field'],
        },
        image_name: {
            type: String,
            required: [true, 'Required field'],
        },
    }
)

module.exports = mongoose.model('Recipe', recipeShema)