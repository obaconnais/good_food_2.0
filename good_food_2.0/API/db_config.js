const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const { modelName } = require('./model/user')

const mongod = new MongoMemoryServer()
 
//conect to db
module.exports.connect = async () => {
    const uri = await mongod.getUri()
    const mongooseOpt = {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        poolSize: 10
    }
    await mongoose.connect(uri, mongooseOpt)
}

//dosconnected db
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

//clear the database 
module.exports.clearDatabase = async() => {
    const collections = mongoose.connection.collection()
    for(const key in collections){
        const collection = collections(key)
        await collections.deleteMany()
    }
}
