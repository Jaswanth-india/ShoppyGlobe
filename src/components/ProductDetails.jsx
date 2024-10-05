import { useParams } from "react-router-dom";
import useFetchHook from "../utils/useFetchHook.js";
import "./ProductDetails.css"
import star from "../assets/star.png";

function ProductDetails(){
    let id=useParams().id;
    let product=useFetchHook("https://dummyjson.com/products/"+id);

    return(
        product.id && [<main id="productDetails" key={1}>
            <div>
                <div><span>Description:</span> {product.description}</div>
                <br/>
                <div>Category: <span>{product.category}</span></div>
                <div>Tags: <span>{product.tags}</span></div>
                <div>Weight: <span>{product.weight}</span></div>
                <div>Dimensions: <span>{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}</span></div>
                <div>Price: <span>{product.price}</span></div>
                <div>Discounted Percentage: <span>{product.discountPercentage}</span></div>
                <div>Stock: <span>{product.stock}</span></div>
                <div>Avalability: <span>{product.availabilityStatus}</span></div>
                <div>Warranty Information: <span>{product.warrantyInformation}</span></div>
                <div>Shipping Information: <span>{product.shippingInformation}</span></div>
                <div>Return Policy: <span>{product.returnPolicy}</span></div>
                <br/>
                <div><span>Reviews:</span></div><br/>
                <div>
                    {product.reviews.map((review,index)=>{
                        return (
                        <div key={index} className="review">
                            <div><span>Name:</span> {review.reviewerName}</div>
                            <div><span>Email:</span> {review.reviewerEmail}</div>
                            <div><span>Date:</span> {review.date}</div>
                            <div><span>Comment:</span> {review.comment}</div>
                            <div><span>Rating:</span> <img src={star} width="10" height="10"/> {review.rating}</div>
                        </div>)
                    })}
                </div>
            </div>
            <div>
                <div><div>{product.title}</div></div>
                <div><img src={product.thumbnail} width="350" height="350"/></div>
                <div><button>Add To Cart</button></div>
            </div>
        </main>]
    )
}

export default ProductDetails;