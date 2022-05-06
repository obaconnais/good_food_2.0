/*************************************************/
/************* mocked db  config *****************/
/*************************************************/
//library for ODM
const mongoose = require('mongoose')
//library for mocked mongodb server
const {MongoMemoryServer} = require('mongodb-memory-server')

//mocked db
let mongod

//to connect to db
module.exports.connect = async () => {
    await mongoose.disconnect() 
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    //connect option
    const mongooseOpt = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
    await mongoose.connect(uri, mongooseOpt)
}

//to disconnected db
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

//to clear the database 
module.exports.clearDatabase = async() => {
    const collections = mongoose.connection.collections
    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany({})
    }
}
