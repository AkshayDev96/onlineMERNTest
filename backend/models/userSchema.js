//import mongoose package
const mongoose =require('mongoose')

//define schema
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','regular_user']
    }
})
module.exports = mongoose.model('users',userSchema)