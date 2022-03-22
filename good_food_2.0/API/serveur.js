/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')
const db = require('./tests/db_handle')

/*******************************************/
/**************** API init *****************/
/*******************************************/
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const user_router = require('./routes/user')(app)

app.get('/',(req,res)=>"")
app.get('user',(req,res)=>user_router)

db.connect()

const port = 5000
const server = app.listen(port, ()=>console.log(`server is listening on port ${port}`))

module.exports = {app, server}