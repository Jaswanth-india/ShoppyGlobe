import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    category:String,
    price:Number,
    rating:Number,
    brand:String,
    thumbnail:String
});

export const allModels={};

fetch("https://dummyjson.com/products/category-list")
.then(data=>data.json())
.then((data)=>{
    for(let i=0;i<data.length;i++){
        allModels[data[i]]=new mongoose.model(data[i],productSchema);
    }
})