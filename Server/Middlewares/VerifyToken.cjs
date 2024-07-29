const jwt = require('jsonwebtoken')
const UserModel = require('../Model/Users.Model.cjs')
require('dotenv').config()

const verifyAccessToken = (req,res,next) =>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT"){
        jwt.verify( req.headers.authorization.split(" ")[1],process.env.ACCESS_TOKEN_SECRET,function(err,verifyedToken){
            if(err){
                res.status(401).send({message : "Invalid JWT Token"})
                return
            }
            UserModel.findById(verifyedToken.id).then((result)=>{
                req.user = result
                next()
            }).catch((err)=>{
                res.status(500).json({message : "server not available",error : "err"})
            })
        })
    }
    else{
        res.status(403).send({message : "No JWT Token present"})
    }
}

const verifyRefreshToken = (req,res,next) =>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT"){
        jwt.verify( req.headers.authorization.split(" ")[1],process.env.REFRESH_TOKEN_SECRET,function(err,verifyedToken){
            if(err){
                res.status(401).send({message : "Invalid JWT Token"})
                return
            }
            UserModel.findById(verifyedToken.id).then((result)=>{
                req.user = result
                next()
            }).catch((err)=>{
                res.status(500).json({message : "server not available",error : "err"})
            })
        })
    }
    else{
        res.status(403).send({message : "No JWT Token present"})
    }
}

module.exports = {verifyAccessToken, verifyRefreshToken}