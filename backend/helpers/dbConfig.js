const mongoose = require('mongoose')

//define Database configuration
const connectDB = async()=>{
    try{
        const env = process.env
        const connectionString = `${env.DB_HOST}://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_SERVER}/${env.DB_NAME}?retryWrites=true&w=majority`
        await mongoose.connect(connectionString)
        console.log("DB is connected, successfully!")
    }catch(e){
        console.log("DB Error",e)
    }
}


module.exports = connectDB