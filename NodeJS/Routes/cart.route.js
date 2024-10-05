import { userModel } from "../Model/user.model.js";
import jwt from "jsonwebtoken";
function cartRouteFunc(app){
    app.post("/cart",(req,res)=>{
        jwt.verify(req.headers.authorization.split(" ")[1],"secretKey",(err,requestedUser)=>{
            if(!err){
                userModel.find({userName:requestedUser}).then((data)=>{
                    let neverMatched=true;
                    for(let i=0;i<data[0].cart.length;i++){
                        if(data[0].cart[i] && data[0].cart[i][0].id===req.body.product.id){
                            neverMatched=false;
                            data[0].cart[i][1]+=1;
                            userModel.updateOne({userName:requestedUser},{$set:{cart:data[0].cart}}).then();
                            break;
                        }
                    }
                    if(neverMatched){
                        userModel.updateOne({userName:requestedUser},{$push:{cart:[req.body.product,1]}}).then()
                    }
                })
                res.send({status:true});
            }else{
                res.send({status:false});
            }
        })
    })

    app.get("/cart",(req,res)=>{
        jwt.verify(req.headers.authorization.split(" ")[1],"secretKey",(err,requestedUser)=>{
            if(!err){
                userModel.find({userName:requestedUser}).then((userData)=>{
                    res.send(userData[0].cart)
                })
            }
        })
    })
    
    app.put("/cart",(req,res)=>{
        jwt.verify(req.headers.authorization.split(" ")[1],"secretKey",(err,requestedUser)=>{
            if(!err){
                userModel.find({userName:requestedUser}).then((data)=>{
                    for(let i=0;i<data[0].cart.length;i++){
                        if(data[0].cart[i] && data[0].cart[i][0].id===req.body.id){
                            if(req.body.increment){
                                data[0].cart[i][1]+=1;
                            }else if(req.body.decrement){
                                data[0].cart[i][1]-=1;
                            }
                            userModel.updateOne({userName:requestedUser},{$set:{cart:data[0].cart}}).then(()=>{
                                res.send({status:true});
                            });
                            break;
                        }
                    }
                })
                
            }else{
                res.send({status:false});
            }
        })
    })

    app.delete("/cart",(req,res)=>{
        jwt.verify(req.headers.authorization.split(" ")[1],"secretKey",(err,requestedUser)=>{
            if(!err){
                userModel.find({userName:requestedUser}).then((data)=>{
                    for(let i=0;i<data[0].cart.length;i++){
                        if(data[0].cart[i] && data[0].cart[i][0].id===req.body.id){
                            delete data[0].cart[i];
                            break;
                        }
                    }
                    userModel.updateOne({userName:requestedUser},{$set:{cart:data[0].cart}}).then(()=>{
                        res.send({status:true});
                    });
                })
                
            }else{
                res.send({status:false});
            }
        })
    })
}

export default cartRouteFunc;