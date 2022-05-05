/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const commandRouter = require('./routes/command')
const restaurantRouter = require('./routes/restaurant')
const authRouter = require('./routes/auth')
const franchiseRouter = require('./routes/franchise')
let app = express()

/*******************************************/
/**************** API init *****************/
/*******************************************/
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

/**
 * global route
 */
app.get('/',(req,res)=>{
    res.send("server is online")
})

/**
 * route for user
 */
app.use('/user',userRouter)

/**
 * route for command
 */
app.use('/command',commandRouter)

/**
 * route for restaurant
 */
app.use('/restaurant', restaurantRouter)

/**
 * route for franchise
 */
 app.use('/franchise', franchiseRouter)

/**
 * route for authentification
 */
app.use('/auth',authRouter)

module.exports = app
