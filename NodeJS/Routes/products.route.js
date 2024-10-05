import { allModels } from "../Model/product.model.js";
import getProducts from "../Controller/fetchProducts.js"

export function productsRoutesFunc(app){
    app.get("/categories",(req,res)=>{
        const interval=setInterval(()=>{
            if(Object.keys(allModels).length){
                res.send(Object.keys(allModels))
                clearInterval(interval);
            }
        },1000)
    })

    app.get("/products/:category",(req,res)=>{
        let executed=false;
        const interval=setInterval(()=>{
            if(allModels[req.params.category] && !executed){
                executed=true;
                getProducts(req.params.category)
                .then((products)=>{
                    if(!res.headersSent && products){
                        clearInterval(interval)
                        res.send(products)
                    }                
                });
            }
        },2000)       
    })

    app.get("/products/:category/:id",(req,res)=>{

    })
}