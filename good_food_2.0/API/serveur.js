const app = require('./app')

const port = 5001

const user_router = require('./routes/user')(app)
const restaurant_router = require('./routes/restaurant')(app)
app.listen(port, () =>console.log(`server is listening on port ${port}`))

module.exports = app
