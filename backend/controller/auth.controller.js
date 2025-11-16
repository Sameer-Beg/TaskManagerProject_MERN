import { json } from "express"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHAndler } from "../utils/error.js"
import jwt from "jsonwebtoken"



// Signup controller function
export const signup = async(req , res , next )=> {
       // Extracting required fields from request body
    const {name , email , password , profileImgUrl , adminJoinCode} = req.body
     // Validate required fields
    if(!name || !email || !password || name === "" || email==="" || password===""){
        return next(errorHAndler(400 , "All fields are required "))
    }
    // Check if the user already exists based on emailxts
    const isAllreadyExists = await User.findOne({
        email
    })
        // If user exists, return error
    if(isAllreadyExists){
        return next(errorHAndler(400 , " user already exixts "))
    }
      // Default role set to 'user'
    let role = "user"
       // If admin join code matches environment variable, assign 'admin' role
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role =  "admin"
    }
    // Hash the password using bcrypt
    const hashedPassword = bcryptjs.hashSync(password , 10)
     // Create new user object
    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        profileImgUrl,
        role,
    })
    try {
        await newUser.save();
        res.json("SignUp successfully")
    } catch (error) {
        next(error.message)
    }
    
}


//signin
export const signin = async(req, res ,  next)=>{
    try {
        const {email , password} = req.body
        if(!email || !password || email==="" || password===""){
            return next(errorHAndler(400 , "All fields are required"))
        }
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHAndler(404 , "User not found"))
        }
        // compare password using bcrypt js 
        const validpassword = bcryptjs.compareSync(password , validUser.password)
        if(!validpassword){
            return next(errorHAndler(400 , "wrong credentials"))
        }
        //token create
        const token = jwt.sign({id:validUser._id , role: validUser.role} ,  process.env.JWT_SEDRET)
        const {password: pass , ...rest} = validUser._doc
        res.status(200).cookie("access_token" , token, {httpOnly:true}).json(rest) 
    } catch (error) {
        next(error)
    }
}

//user profile
export const userProfile  = async(req, res , next)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return next(errorHAndler(404 , "User not found"))
        }
        const {password: pass , ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
       next(error) 
    }
}

//updateUserProfile
export const updateUserProfile = async(req , res , next )=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return next(errorHAndler(404 , "User not found"))
        }
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = bcryptjs.hashSync(req.body.password , 10)
        }
        const updateduser = await user.save()
        const {password: pass, ...rest} = user._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}



export const uploadImage = async(req , res , next)=>{
    try {
        if(!req.file){
            return next(errorHAndler(400 , "No file uploaded"))
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        res.status(200).json({
            imageUrl
        })
    } catch (error) {
        next(error)
        
    }
}