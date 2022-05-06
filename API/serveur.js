const app = require('./app')
const db = require('./db_config')
const port = process.env.PORT || 5001

db.connect()
app.listen(port, () =>console.log(`server is listening on port ${port}`))

module.exports = app
