import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import jwtTokenContext from "../utils/jwtTokenContext.js";
import { useContext,useState,useEffect } from "react";
import "./cartItem.css";

function Cart (){console.log()
    let userToken=useContext(jwtTokenContext).jwtToken;    
    let [products,setProducts]=useState([]);
    console.log("hii");
    useEffect(()=>{
        fetch("http://localhost:5100/cart",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "authorization":"JWT "+userToken
            },
        }).then((res)=>res.json())
        .then((res)=>{
            if(document.querySelector("#loading")){
                document.querySelector("#loading").style.display="none";
            }
            setProducts(res)
        })
    },[])
    
    return(
        <section id="cart">
            {
                products && products.map((product, index)=>{return product && <CartItem key={index} product={product[0]} quantity={product[1]} index={index}/>})
            }
            <div id="loading">Loading.....</div>
        </section>
    )
}

export default Cart;