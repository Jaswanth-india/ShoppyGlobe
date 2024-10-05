import { userModel } from "../Model/user.model.js";
import jwt from "jsonwebtoken";

export function userRoutesFunc(app){
    app.post("/register",(req,res)=>{
        (new userModel({
            userName:req.body.userName,
            password:req.body.password
        })).save().then(()=>{
            res.send({userAdded:true})
        }).catch((data)=>{
            if(data.code==11000){
                console.log("Registration Denied:");
                console.log("Reason: Duplicate user registration");
                res.send({userAdded:false,code:11000});
            }
        })
    })

    async function authenticateUser(req,res){
        if((await userModel.find({userName:req.body.userName,password:req.body.password})).length==1){
            res.send({loginStatus:true,token:jwt.sign((await userModel.find({userName:req.body.userName}))[0].userName,"secretKey")});
        }else{
            res.send({loginStatus:false})
        }
    }
    app.post("/login",(req,res)=>{
        authenticateUser(req,res)
    })
}