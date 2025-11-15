import mongoose from "mongoose";

const taskSchma = new mongoose.Schema({
    title:{
        type:String,
        required:true, 
    },
    description:{
        type:String
    },
    prioriry:{
        type:String,
        enum:["Low" , "Medium" ,"Hign"],
        default:"Low",
    },
    status:{
        type:String,
        enum:["Pending" , "In Progess"  , "Completed "],
        default:"Pending",
    },
    dueDate:{
        type:Date,
        required:true,
    },
    assigedTo:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        
    },
    ],
    createdBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    attachments:[{
       type:String 
    },],
    todocheckList:[todoSchema],
    progress:{type:Number , default:0},
},
{timestamps:true})
const Task = mongoose.model("Task" , taskSchma)
export default Task