import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux"; //For dispatching an action to the redux store
import { removeItem } from "../utils/cartSlice.js";
import rating from "../assets/star.png"// Image
import jwtTokenContext from "../utils/jwtTokenContext.js";
import { useContext,useState } from "react";

//Component for each cart item
function CartItem(props){
    let userToken=useContext(jwtTokenContext).jwtToken;
    let [toggle,setToggle]=useState(1);
    let [quantity,setQuantity]=useState(props.quantity);

    function handleIncrement(){
        if(document.querySelector("#loading")){
            document.querySelector("#loading").style.display="block";
        }
        fetch("http://localhost:5100/cart",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"JWT "+userToken
            },
            body:JSON.stringify({
                increment:true,
                id:props.product.id
            })
        })
        .then((data)=>data.json())
        .then((data)=>{
            if(document.querySelector("#loading")){
                document.querySelector("#loading").style.display="none";
            }
            if(data.status){
                setQuantity(quantity+1);
            }
        })
    }

    function handleDecrement(){
        if(document.querySelector("#loading")){
            document.querySelector("#loading").style.display="block";
        }
        fetch("http://localhost:5100/cart",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"JWT "+userToken
            },
            body:JSON.stringify({
                decrement:true,
                id:props.product.id
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(document.querySelector("#loading")){
                document.querySelector("#loading").style.display="none";
            }
            if(res.status && quantity>1){
                setQuantity(quantity-1)
            }
        })
    }

    function handleDelete(e){
        if(document.querySelector("#loading")){
            document.querySelector("#loading").style.display="block";
        }
        fetch("http://localhost:5100/cart",{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "authorization":"JWT "+userToken
            },
            body:JSON.stringify({
                id:props.product.id
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(document.querySelector("#loading")){
                document.querySelector("#loading").style.display="none";
            }
            if(res.status){
                let productContainer=e.target
                while(!productContainer.classList.contains("cartProduct")){
                    productContainer=productContainer.parentNode;
                }
                productContainer.style.display="none";
            }
        })
    }
    return(
        <div className="cartProduct">
            <div>
                <Link to={"/product/"+props.product.id}>
                    <div><img src={props.product.thumbnail} height="200"/></div>
                    <div>{props.product.title}</div>
                </Link>
            </div>
            <div>
                <h3>Product Details</h3>
                <div><b>Description:</b>{props.product.description}</div>
                <br/>
                <div>Brand:{props.product.brand}</div>
                <div>Category:{props.product.category}</div>
                <div><b>Price:</b>{props.product.price}</div>
                <div>Ratings: <img src={rating} width="10" height="10"/>{props.product.rating}</div>
            </div>
            <div>
                <div>
                    <h1>{quantity}</h1>
                    <div>Quantities</div>
                </div>
                <div>
                    <button disabled={quantity>1?false:true} onClick={handleDecrement}>Decrement</button>
                    <button onClick={handleIncrement}>Increment</button>
                </div>
                <div>
                    <button onClick={(e)=>handleDelete(e)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

{/* <Link to={"/product/"+props.product.id}>
                <div>{props.product.brand}</div>
                <div><img src={props.product.thumbnail} width="200" height="200"/></div>
                <div>{props.product.title}</div>
                <div>Category: {props.product.category}</div>
                <div>
                    <div>Price: ₹<span>{props.product.price}</span></div>
                    <div><button onClick={(e)=>{handleRemoveItem(e)}}>Remove from Cart</button></div>
                    <div>Ratings: <img src={rating} width="10" height="10"/> {props.product.rating}</div>
                </div>
            </Link> */}

export default CartItem;