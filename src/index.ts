import { run , userModel } from "./db";
import  express ,{Response , Request ,NextFunction } from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
dotenv.config()
import {z} from "zod"
const userObject = z.object({
    username : z.string(),
    email : z.string().email(),
    age :z.number().optional(),
    password:z.string().min(8).max(20)
})
type user  = z.infer<typeof userObject>
const app = express()
app.use(express.json())
run()
app.post("/users/register" ,async (req:Request ,res:Response)=>{
    try{
        console.log(req.body);
        const userDetails : user = req.body; 
        const response = userObject.safeParse(userDetails);
        if(response.success){
          const exitUser = await  userModel.findOne({username:userDetails.username, email:userDetails.email})
          if(exitUser){
            res.json({
                message:"The username Or Email is already existed",
                success:false
            })
            return; 
          }else{
             console.log("befor  hashing the password")
            const  hashpassword = await bcrypt.hash(userDetails.password,10)
             console.log("after hashing the password")
             console.log(hashpassword);
            await userModel.insertOne({
                username:userDetails.username , 
                email :userDetails.email,
                age:userDetails.age ?  userDetails.age : null,
                password:hashpassword
            }).then(()=>{
                res.status(200).json({
                    message:"Sucessfully Registered",
                    success : true 
                })
            })
          }
        }else{
            const error =response.error.errors;
            const formatedError = error.map((err)=>({
               name : err.path[0],
               msg : err.message
            }))
            res.status(401).json({
                Message : "Enter user data is inFormate",
                formatedError})
            return; 
        }
    }catch(error)
    {
      res.status(403).json({
        message:error, 
        success : false
      })
    }
    
})
app.listen(process.env.PORT ,()=>{
    console.log(`app running on  port ${process.env.PORT}`);
})