//import express router 
const route = require('express').Router()
const tasksController = require('../../controllers/tasks/tasksController')
const {auth} = require('../../middlewares/index')
const validate =require('../../middlewares/validate')
//add the task
route.post('/add',auth,validate.taskAdd,tasksController.add)

//update the task
route.put('/update/:id',auth,validate.taskUpdate,tasksController.update)

//delete the task
route.delete('/delete/:id',auth,tasksController.delete)

//get task list
route.get('/list',auth,tasksController.list)

//get task list by userid
route.get('/list/:user_id',auth,tasksController.listByUser)

module.exports = route