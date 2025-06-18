import mongoose ,{Schema , model , Document, Types }  from "mongoose";
import dotenv from 'dotenv';
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
const contentType : string [] = ['image', 'video','audio','article']
const contentSchema = new Schema({
  link : {type : String , required : true },
  type : {type : String , enum : contentType},
  title : {type : String , required : true },
  tags : [{type:mongoose.Types.ObjectId,ref :TagModel}],
  userId : {type :mongoose.Types.ObjectId , ref: userModel,required : true }
})
export const contnetModel = model("Content",contentSchema)

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

