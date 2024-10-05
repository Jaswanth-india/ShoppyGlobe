import { allModels } from "../Model/product.model.js";

async function fetchProducts(res,category){
    for(let i=0;i<res.products.length;i++){
        let newProduct=new allModels[category](res.products[i]);
        await newProduct.save()
    }
    return await allModels[category].find({});
}

async function getProducts(category){
    let products={products:[]};
    products.products=await allModels[category].find({});
    if(products.products.length){
        return products;
    }else{
        products.products=await fetch('https://dummyjson.com/products/category/'+category)
        .then((res)=>res.json())
        .then(async (res)=>await fetchProducts(res,category));
        return products;
    }
}

export default getProducts;