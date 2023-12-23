const { checkToken } = require("../helpers");



exports.auth = async(req,res,next)=>{
    try{
        const token = (req?.headers?.authorization+"")?.replace("Bearer ","")
        if(!token ||token==undefined||token==null){
            new Error("Token is missing!")
        }
        const result = await checkToken(token)
        if(result){
            req.user = result
            if(result?.data?.role=='regular_user' && ((req?.method+"")?.toLowerCase()=="put"||(req?.method+"")?.toLowerCase()=="delete")){
                return res.status(401).json({ errorMessage: "Access denied, regular user can`t update or delete any record!" });
            }
            next()
        }else{
            return res.status(401).json({ errorMessage: "Access denied, token is expired!" });
        }
    }catch(e){
        if(e?.message){
            return res.status(401).json({ errorMessage: e.message });
        }
        console.log("AuthError",e)
        return res.status(500).json({ errorMessage: "Something went wrong!" });
    }
}