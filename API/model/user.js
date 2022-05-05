const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userSchema = new Schema(
    {
        lastname: {
            type: String, 
            required: [true, 'Required field'],
        },
        forname: {
            type: String, 
            required: [true, 'Required field'],
        },
        mail: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/                
        },
        address: {
            type: String, 
            required: [true, 'Required field'],
        },
        password: {
            type: String, 
            required: [true, 'Required field'],
        }, 
        phone: {
            type: String
        }
    }
)

/*
    //do not touch format function
    //if you want to change for arrow function
    //this have not the same context (case of this => on file)
*/
userSchema.pre('save',async function() {
    const user = this
    if(user.password){
        salt = await bcrypt.genSalt(saltRounds)
        this.password = await bcrypt.hash(this.password,salt)
    }
})

userSchema.checkPassword = async (password, originel) => {
    if(password && originel){
        const test = await bcrypt.compare(password,originel)
        return test
    }
    else{
        console.log('missing argument')
        return false
    }
}


module.exports = mongoose.model('User', userSchema)