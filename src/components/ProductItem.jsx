import { Link } from "react-router-dom";
import rating from "../assets/star.png"
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { addItem,increaseCounter } from "../utils/cartSlice";
import jwtTokenContext from "../utils/jwtTokenContext.js";

function ProductItem (props){
    let dispatch=useDispatch();
    let token="JWT "+useContext(jwtTokenContext).jwtToken;
    function handleAddItem(e){
        e.preventDefault()
        fetch("http://localhost:5100/cart",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "authorization":token
            },
            body:JSON.stringify({product:props.product})
        })
        .then((res)=>res.json())
        .then((res)=>{
            e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display="block";
            if(res.status){
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.background="rgb(126, 238, 151)";
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].innerHTML="Successfull";
            }else{
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.background="rgb(238, 152, 126)";
                e.target.parentNode.parentNode.parentNode.parentNode.children[1].innerHTML="Failed";
            }
            setTimeout(()=>{
                if(e){
                    e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display="none";
                }
            },2000)
        })
    }

    return (
        <div className="product">
            <Link to={"/product/"+props.product.id}>
                <div>{props.product.brand}</div>
                <div><img src={props.product.thumbnail} width="200" height="200"/></div>
                <div>{props.product.title}</div>
                <div>Category: {props.product.category}</div>
                <div>
                    <div>Price: ₹<span>{props.product.price}</span></div>
                    <div><button onClick={(e)=>{handleAddItem(e)}}>Add to Cart</button></div>
                    <div>Ratings: <img src={rating} width="10" height="10"/> {props.product.rating}</div>
                </div>
            </Link>
            <div></div>
        </div>
    )
}

export default ProductItem;