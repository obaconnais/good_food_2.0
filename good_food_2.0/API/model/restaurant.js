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
            type: String,
            required: [true, 'Required field']            
        },
        telephone: {
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
        franchised: {
            type: Boolean,
            required: [true, 'Required field'],
            default: false                    
        },
        schedule: {
            type: Object,
            required: [true, 'Required field']              
        }
    }
)

module.exports = mongoose.model('Restaurant', restaurantSchema)