//import express router 
const route = require('express').Router()


//root route mapping
// here v1 stands for API version
route.use("/api/v1/task",require('./task/taskRoute'))
route.use("/api/v1/user",require('./user/userRoute'))


module.exports = route