/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const commandRouter = require('./routes/command')
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

module.exports = app