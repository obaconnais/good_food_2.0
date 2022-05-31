// const { json } = require('docker/src/languages')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Required field'],
            match: /^[a-zA-Z\d 'éèêëîïàâùûôçœ]+$/
        },
        address: {
            type: Object,
            required: [true, 'Required field']
        },
        phone: {
            type: String,
            required: [true, 'Required field'],
            match: /^\+\d{2}\d{9}$/
        },
        mail: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        },
        franchisedGroup: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        schedule: {
            type: Object,
            required: [true, 'Required field']
        }
    }
)

module.exports = mongoose.model('Restaurant', restaurantSchema)