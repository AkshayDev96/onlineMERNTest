const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs')



//for success response
exports.sendResponse = (res, message, status = 200,data=null) => {
    return res.status(status).json({
        message: message,
        data:data
    })
}

//for success response
exports.sendErrorResponse = (res, error, status = 500) => {
    return res.status(status).json({
        errorMessage: error?.message
    })
}

//password encryption
exports.encryptPassword = (password) => {
    if (!password) { return }
    return crypto.AES.encrypt(password, process.env.password_encryption_key).toString();
}

//password decryption
exports.decryptPassword = (password) => {
    if (!password) { return }
    var bytes = crypto.AES.decrypt(password, process.env.password_encryption_key);
    var originalText = bytes.toString(crypto.enc.Utf8);
    return originalText;
}

//jwt signature
exports.generateToken = (data)=>{
    const secret = fs.readFileSync("./crets/private.pem")
    return jwt.sign(data,secret, { algorithm: 'RS256' ,expiresIn:'1h'});
}

exports.checkToken = (token)=>{
    const secret = fs.readFileSync("./crets/public.pem")
    return jwt.verify(token,secret);
}