//configure dot env file production / development
const doteEnv = require('dotenv')
if(process.env.NODE_ENV=='development'){
    doteEnv.config({path:'.env.development',override:true})
}else{
    doteEnv.config({path:'.env.development',override:true})
}



//import dbConfig
const dbConfig = require('./helpers/dbConfig')

//import express
const express = require('express')
const app = express()

//PORT 
const PORT = process.env.PORT
//BASE URL
const BASE_URL = process.env.BASE_URL

//cors origin
const cors = require('cors')
app.use(cors())
//middleware
//for body parser
app.use(express.json({urlencoded:true}))
app.use(require('./routes'))


//Connect to DB
dbConfig().then(()=>{
    //START SERVER ENGINE
    app.listen(PORT,()=>{
        console.log(`Server is running on ${BASE_URL}:${PORT}`)
    })
})
