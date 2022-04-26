
/*******************************************/
/**************** API init *****************/
/*******************************************/
let express = require('express')
let cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const user_router = require('./routes/user')(app)
const restaurant_router = require('./routes/restaurant')(app)

app.get('/', (req, res) => "")

const recipe_router = require('./routes/recipe')
app.get('/recipe', (req, res) => recipe_router)

const port = 5000
const server = app.listen(port, () => console.log(`server is listening on port ${port}`))

module.exports = { app, server }
