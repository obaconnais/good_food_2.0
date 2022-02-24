/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')

/*******************************************/
/**************** API init *****************/
/*******************************************/
const app = express()

app.use(cors());
app.use(express.json);
app.use(express.urlencoded({extended:true,}));

app.get('/',(req,res)=>"mocked response for application")

const port = 5000
const server = app.listen(port, ()=>console.log(`server is listening on port ${port}`))

module.exports = {app, server}