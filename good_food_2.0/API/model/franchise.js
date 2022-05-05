const mongoose = require('mongoose')
const Schema = mongoose.Schema

const franchiseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Required field'],
            unique: true,
            match: /^[a-zA-Z\d 'éèêëîïàâùûôçœ]+$/         
        }
    }
)

module.exports = mongoose.model('Franchise', franchiseSchema)