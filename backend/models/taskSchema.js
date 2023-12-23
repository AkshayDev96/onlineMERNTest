//import mongoose package
const mongoose =require('mongoose')

//define schema
const taskSchema = mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Completed","To-do","Pending","In-progress"],
        default:"To-do"
    },
    assign_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})

module.exports =  mongoose.model('tasks',taskSchema)