import mongoose ,{Schema , model , Document }  from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); 
interface Iuser extends Document {
    username  : string , 
    email : string , 
    age? : number , 
    password:String ,
}
const userSchema = new Schema<Iuser>({
  username :{type :String , required : true },
  email :{type : String , required:true},
  age:{type :String},
  password:{type:String}
})
export const userModel = model<Iuser>("User",userSchema);
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

