const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

let mongod

//conect to db
module.exports.connect = async () => {

    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    
    const mongooseOpt = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
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
    const collections = mongoose.connection.collection
    for(const key in collections){
        const collection = collections[key]
        await collection.deleteMany()
    }
}
