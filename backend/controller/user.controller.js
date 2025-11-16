import { status } from "init"
import User from "../models/user.model.js"
import Task from "../models/task.model.js"

export const getUsers = async(req , res , next)=>{  
     try {
        const users = await User.find({
            role:"user"
        }).select("-password")

        const userWithTaskCount = await Promise.all(
            users.map(async(user)=>{
                const pendingtask = await Task.countDocuments({
                    assignedTo: user._id,
                    status:"Pending",
                })
                const inProgresstask = await Task.countDocuments({
                    assignedTo: user._id,
                    status:"In Progress",
                })
                const completedtask = await Task.countDocuments({
                    assignedTo: user._id,
                    status:"Completed",
                })
                return{
                    ...user._doc,
                    pendingtask,
                    inProgresstask,
                    completedtask,
                }
            })
        )
        res.status(200).json(userWithTaskCount)
    } catch (error) {
        next(error)
        
    }
}