import { errorHAndler } from "./error.js"
import jwt from "jsonwebtoken"
export const verifyToken = (req , res , next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(errorHAndler(401 , "Unauthorized"))
    }

    jwt.verify(token , process.env.JWT_SEDRET , (err , user)=>{
        if(err){
            return next(errorHAndler(401 , "unauthorized"))
        }
        req.user = user 
        next()

    })
}

export const adminOnly  = (req, res , next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        return next(errorHAndler(403 ,  "Access Denied , admin only "))
    }
}