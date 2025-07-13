import mongoose ,{Schema , model , Document, Types }  from "mongoose";
import dotenv from 'dotenv';
import { string } from "zod"; 
dotenv.config(); 
interface Iuser extends Document {
    username  : string , 
    email : string , 
    age? : number , 
    password:String ,
}
// userschema and model 
const userSchema = new Schema<Iuser>({
  username :{type :String , required : true },
  email :{type : String , required:true},
  age:{type :String},
  password:{type:String}
})
export const userModel = model<Iuser>("User",userSchema); 

// TagSchema and tag model 
const TagSchema = new Schema({
  title : {type : String , required : true , unique : true}
})
export const TagModel = model('Tag',TagSchema)

// content schema and model 
const contentType : string [] = ["document" , "tweet" , "youtube" , "link"]
const contentSchema = new Schema({
  link : {type : String , required : true },
  type : {type : String , enum : contentType},
  title : {type : String , required : true },
  Description : {type :String},
  tags : [{type:mongoose.Types.ObjectId,ref :TagModel}],
  userId : {type :mongoose.Types.ObjectId , ref: userModel,required : true }
})
export const contnetModel = model("Content",contentSchema)

 
//SharedContent 
const SharedSchema = new mongoose.Schema({
  shareBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  shareTo: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  contentId: { type:mongoose.Types.ObjectId, ref: 'Content', required: true }
});
export const SharedModel = model("ShareContent",SharedSchema);

// function to connect the mongodb 
export async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: "Brianly"
    });
    console.log("✅ Database connected successfully...");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

