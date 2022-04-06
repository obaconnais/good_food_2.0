/*******************************************/
/************** library import *************/
/*******************************************/
const express = require('express')
const cors = require('cors')


/*******************************************/
/**************** API init *****************/
/*******************************************/
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const user_router = require('./routes/user')
const recipe_router = require('./routes/recipe')
app.get('/', (req, res) => res.status(501).send(`What the fuck ?`))

// app.get('user', (req, res) => user_router)
app.get('recipe', (req, res) => recipe_router)

const port = 5000
const server = app.listen(port, () => console.log(`server is listening on port ${port}`))

module.exports = { app, server }