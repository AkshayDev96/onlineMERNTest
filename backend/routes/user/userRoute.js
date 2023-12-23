//import express router 
const route = require('express').Router()
const usersController = require('../../controllers/user/userController')
//validate
const validate =require('../../middlewares/validate')
const {auth} = require('../../middlewares/index')


//register user
route.post('/register',validate.register,usersController.register)

//login user based on role
route.post('/login',validate.login,usersController.login)


route.get('/list',auth,usersController.list)


module.exports = route