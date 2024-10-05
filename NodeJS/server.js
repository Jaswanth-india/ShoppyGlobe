import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { productsRoutesFunc } from "./Routes/products.route.js";
import { userRoutesFunc } from "./Routes/user.route.js";
import  cartRouteFunc from "./Routes/cart.route.js";

const app= new express();

app.listen(5100,()=>{
    console.log("Server Started Successfully");
})

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Practise");
mongoose.connection.on("open",()=>{
    console.log("The connection to mongodb is successfull");
})

productsRoutesFunc(app);

userRoutesFunc(app);

cartRouteFunc(app);