const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commandShema = new Schema(
    {
        kind: String,
        restaurant: String,
        paymentMethod: String,
        date: Date,
        products: [],
        price: Number,
        currency: String,
        state: String,
        user_id: String

    }
)

module.exports = mongoose.model('Command', commandShema)