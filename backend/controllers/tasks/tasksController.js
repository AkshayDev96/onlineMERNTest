//user schema imported
const taskSchema = require('../../models/taskSchema')
const { encryptPassword, sendResponse, sendErrorResponse, decryptPassword, generateToken } = require('../../helpers')
const { default: mongoose } = require('mongoose')



//task based on roles
exports.add = async (req, res) => {
    try {
        //task, status, assign - fields

        let query = { task: req?.body?.task,assign_to: req?.body?.assign_to }
        if(req?.body?.status){
            query.status = req?.body?.status
        }
        const taskAdd = taskSchema(query)
        await taskAdd.save()

        //success response
        return sendResponse(res, "Task is assigned, successfully!", 201)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Task already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}

//task based on roles
exports.update = async (req, res) => {
    try {
        //task, status, assign - fields
        const {id} = req.params
        if(!id){
          return sendErrorResponse(res, { message: "Id is missing!" })
        }
        
        let query = { task: req?.body?.task,assign_to: req?.body?.assign_to }
        if(req?.body?.status){
            query.status = req?.body?.status
        }
        const taskUpdated = await taskSchema.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $set: req.body })

        //success response
        return sendResponse(res, "Task is updated, successfully!", 200,taskUpdated)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Task already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}

//task delete based on roles
exports.delete = async (req, res) => {
    try {
        //task, status, assign - fields
        const {id} = req.params
        if(!id){
          return sendErrorResponse(res, { message: "Id is missing!" })
        }
        
        let query = { task: req?.body?.task,assign_to: req?.body?.assign_to }
        if(req?.body?.status){
            query.status = req?.body?.status
        }
        const taskDeleted = await taskSchema.findByIdAndDelete({_id:new mongoose.Types.ObjectId(id)})

        //success response
        return sendResponse(res, "Task is deleted, successfully!", 200,taskDeleted)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Task already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}

//task list
exports.list = async (req, res) => {
    try {
        //task, status, assign - fields
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }

        

        let search = {}
        if(req?.query?.search){
            search = {task:{$regex:req?.query?.search,$options:'i'}}
        }

        if(req?.query?.assign_to){
            search = {...search,assign_to:new mongoose.Types.ObjectId(req?.query?.assign_to)}
        }
        console.log(req.user?.data);
        if(req.user?.data && req.user?.data?.role=='regular_user'){
            search = {...search,assign_to:new mongoose.Types.ObjectId(req.user?.data?._id)}
        }

        const taskLists = await taskSchema.find(search).populate("assign_to","username").skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)

        //success response
        return sendResponse(res, "Task is list fetched, successfully!", 200,taskLists)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Task already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}

//Task list by user
exports.listByUser = async (req, res) => {
    try {
        //assign - fields
        const {user_id} = req.params 
       
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }

        let search = {assign_to: new mongoose.Types.ObjectId(user_id)}
        if(req?.query?.search){
            search = {...search,task:{$regex:req?.query?.search,$options:'i'}}
        }

        const taskLists = await taskSchema.find(search).populate("assign_to","username").skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)

        //success response
        return sendResponse(res, "Task is list fetched, successfully!", 200,taskLists)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Task already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}