import { run, userModel, TagModel, contnetModel } from "./db";
import express, { Response, Request } from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { authMiddleware } from "./auth";
dotenv.config()
import { z } from "zod"
import { readBuilderProgram } from "typescript";
import { ObjectId } from "mongoose";
const userObject = z.object({
  username: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
  password: z.string().min(8).max(20)
})
type user = z.infer<typeof userObject>
const app = express()
app.use(express.json())
run()
app.post("/users/register", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const userDetails: user = req.body;
    const response = userObject.safeParse(userDetails);
    if (response.success) {
      const exitUser = await userModel.findOne({ username: userDetails.username, email: userDetails.email })
      if (exitUser) {
        res.json({
          message: "The username Or Email is already existed",
          success: false
        })
        return;
      } else {
        console.log("befor  hashing the password")
        const hashpassword = await bcrypt.hash(userDetails.password, 10)
        console.log("after hashing the password")
        console.log(hashpassword);
        await userModel.insertOne({
          username: userDetails.username,
          email: userDetails.email,
          age: userDetails.age ? userDetails.age : null,
          password: hashpassword
        }).then(() => {
          res.status(200).json({
            message: "Sucessfully Registered",
            success: true
          })
        })
      }
    } else {
      const error = response.error.errors;
      const formatedError = error.map((err) => ({
        name: err.path[0],
        msg: err.message
      }))
      res.status(401).json({
        Message: "Enter user data is inFormate",
        formatedError
      })
      return;
    }
  } catch (error) {
    res.status(403).json({
      message: error,
      success: false
    })
  }

})
app.post("/users/login", async (req: Request, res: Response) => {
  interface userlogin {
    email: string,
    password: string
  }
  try {
    const userDetails: userlogin = req.body;
    const exitUser = await userModel.findOne({ email: userDetails.email })
    if (exitUser) {
      const hash: string = exitUser.password.toString();
      const passwordcheck = await bcrypt.compare(userDetails.password, hash)
      if (passwordcheck) {
        const token = jwt.sign(
          { _id: exitUser._id },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          message: "successfuly login ",
          token: token,
          success: false
        })
        return;
      } else {
        res.json({
          message: "password is incorrect",
          success: false
        })
      }
    } else {
      res.status(200).json({
        messsage: "The email is doesn't it exitsed",
        success: false
      })
    }
  } catch (error) {
    res.json({
      message: "Error ocurred at database ot server ",
      success: false
    })
  }
})
app.use(authMiddleware as express.RequestHandler)
app.post("/users/api/content", async (req: Request, res: Response) => {
  const userId = req.userId;
  console.log(userId)
  interface contentType {
    link: string,
    type: string,
    title: string,
    tags: string[]
  }
  const contentDetails: contentType = req.body;
  if (contentDetails === null) {
    res.status(411).json({
      message: "Input is invalid ",
      sucsess: false
    })
    return
  }
  try {
    const TagId = await Promise.all(
      contentDetails.tags.map(async (tagTitle) => {
        let tag = await TagModel.findOne({ title: tagTitle });
        if (!tag) {
          tag = await TagModel.create({ title: tagTitle });
        }
        return tag._id; 
      })
    );
     console.log(TagId);
    await contnetModel.create({
      link: contentDetails.link,
      type: contentDetails.type,
      title: contentDetails.title,
      tags:[...TagId],
      userId: userId
    })
      res.status(200).json({
        message: "created successfully",
        success: true
        })
  } catch (error) {
    res.status(404).json({
      message: "Error occured while in database or server",
      success: false,
      error
    })
    return
  }

});
app.get("/users/api/content",async (req : Request , res  : Response)=>{
  const userId = req.userId ; 
  try{
   const contents = await contnetModel.find({userId : userId})
   console.log(contents);
  }catch(error){

  }
})
app.listen(process.env.PORT, () => {
  console.log(`app running on  port ${process.env.PORT}`);
})
