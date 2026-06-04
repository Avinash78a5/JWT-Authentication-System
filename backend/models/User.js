import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    }
})

const User = mongoose.model("User",userSchema);

export default User;