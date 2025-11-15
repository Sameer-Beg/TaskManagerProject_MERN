import { json } from "express"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHAndler } from "../utils/error.js"

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