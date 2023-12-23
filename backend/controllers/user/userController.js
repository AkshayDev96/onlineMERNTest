//user schema imported
const userSchema = require('../../models/userSchema')
const { encryptPassword, sendResponse, sendErrorResponse, decryptPassword, generateToken } = require('../../helpers')



//register user based on roles
exports.register = async (req, res) => {
    try {
        //username,password,confirm_password,role fields

        // if (req?.body?.password !== req.body.confirm_password) {
        //     //send bad request response if password is not matched
        //     return sendErrorResponse(res, { message: "Password is not matched" }, 400)
        // }

        req.body.password = encryptPassword(req?.body?.password)

        const userAdd = userSchema({ username: req?.body?.username, password: req?.body?.password, role: req?.body?.role })
        await userAdd.save()

        //success response
        return sendResponse(res, "User is registered, successfully!", 201)

    } catch (e) {
        if(e?.code==11000){
            return sendErrorResponse(res,{message:"Username already exists!"}, 400)
        }
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}


//login user based on roles
exports.login = async (req, res) => {
    try {

        //username,password,role fields
        
        //case 1: check user is exists or not!
        const result = await userSchema.find({username:req?.body?.username,role:req?.body?.role}).limit(1)
        if(!result || result?.length==0){
            return sendErrorResponse(res,{message:"User does not exists!"},400)
        }

        const userData = result[0]
        if(req?.body?.password==decryptPassword(userData?.password)){
            //success response
            return sendResponse(res, "User is logged-in, successfully!", 200,{
                refreshToken:generateToken({data:userData}),
                expiresIn:'1h'
            })
        }

        //else send password is incorrect
        return sendErrorResponse(res,{message:"Ops! sorry, Password is incorrect!"},400)

    } catch (e) {
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
        const list = await userSchema.find({role:"regular_user"})

        //success response
        return sendResponse(res, "User is list fetched, successfully!", 200,list)

    } catch (e) {
        if (e?.message) {
            return sendErrorResponse(res, e, 400)
        }
        return sendErrorResponse(res, { message: "Something is went wrong!" })
    }
}

