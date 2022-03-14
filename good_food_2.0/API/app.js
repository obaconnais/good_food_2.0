/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')

let app = express()

/*******************************************/
/**************** API init *****************/
/*******************************************/
app.use(express.json());
app.use(cors())
// app.use(express.urlencoded({extended:true}));
// app.use(cors());

app.get('/',(req,res)=>{
    res.send("server is online")
})

app.use('/user',userRouter)

module.exports = app