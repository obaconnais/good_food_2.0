const mongoose = require('mongoose')

module.exports.connect = async ()=>{
    try{
      const url = process.env.MONGO_URL || null
      mongoose.connect(
        url,
        {useNewUrlParser: true, useUnifiedTopology: true},
        ()=>console.log("connected to Mongoose")
      )
      const dbConnection = mongoose.connection;
      /**
       * check the connection
       */
      dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
      dbConnection.once("open", () => console.log("Connected to DB!"));
    }
    catch(err){
      console.error("could not connect")
    }
}
