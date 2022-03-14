const app = require('./app')

const port = 5001
app.listen(port, () =>console.log(`server is listening on port ${port}`))

module.exports = app