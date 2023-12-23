const yup = require('yup')

//schema for user register validation
const userRegSchema = yup.object({
    username: yup.string("Username be alphabet string!").required("Username is required!"),
    password: yup.string("Password must be alphabet string!").required("Password is required"),
    role: yup.string("Role must be alphabet string!").oneOf(['admin','regular_user'],'Invalid role, action admin or regular_user').required("Role is required"),
})

//schema for user login validation
const userLoginSchema = yup.object({
    username: yup.string("Username be alphabet string!").required("Username is required!"),
    password: yup.string("Password must be alphabet string!").required("Password is required"),
    role: yup.string("Role must be alphabet string!").oneOf(['admin','regular_user'],'Invalid role, action admin or regular_user').required("Role is required"),
})


//schema for task add validation
const addTaskSchema = yup.object({
    task: yup.string("Task be alphabet string!").required("Task is required!"),
    assign_to: yup.string("Assign to must be alphabet string!").required("Assign to is required"),
    status: yup.string("status must be alphabet string!").required("status is required"),
})

const updateTaskSchema = yup.object({
    task: yup.string("Task be alphabet string!").required("Task is required!"),
    assign_to: yup.string("Assign to must be alphabet string!").optional(),
    status: yup.string("status must be alphabet string!").optional(),
})

exports.register = async(req,res,next)=>{
    try {
        await userRegSchema.validate(req.body);
        next()
    } catch (err) {
      return res.status(400).json({ errorMessage: err.message });
    }
}

exports.login = async(req,res,next)=>{
    try {
        await userLoginSchema.validate(req.body);
        next()
    } catch (err) {
      return res.status(400).json({ errorMessage: err.message });
    }
}


exports.taskAdd = async(req,res,next)=>{
    try {
        await addTaskSchema.validate(req.body);
        next()
    } catch (err) {
      return res.status(400).json({ errorMessage: err.message });
    }
}

exports.taskUpdate = async(req,res,next)=>{
    try {
        await updateTaskSchema.validate(req.body);
        next()
    } catch (err) {
      return res.status(400).json({ errorMessage: err.message });
    }
}