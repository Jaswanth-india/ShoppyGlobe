import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:Array    
})

export const userModel=mongoose.model("User",userSchema);