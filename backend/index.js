import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"

dotenv.config(); //  .env config 

// db connected 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB is connected ")
}).catch((err)=>{
    console.log(err)
})

const app = express();

//middlle ware to handle cors 
app.use(cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173",
    methods:["GET" , "POST" , "PUT" , "DELETE"],
    allowedHeaders:["Content-Type" , "Authorization"],

}))

//middle ware to handle json obj in req body
app.use(express.json())


app.listen(3000 , ()=>{
    console.log("server is runing on port 3000 ")
})


app.use("/api/auth"  ,authRoutes)