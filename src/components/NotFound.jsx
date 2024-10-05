import { useRouteError,Link } from "react-router-dom";
import "./NotFound.css";

function NotFound(){
    let errorData=useRouteError();
    return(
        <>
            <div id="errorContainer">
                <div>
                    <h1>{errorData.status}</h1>
                    <h1>{errorData.statusText}</h1>
                    <div>Oops! The page you are looking for is not found <Link to="/"><button>Return to Home</button></Link></div>
                </div>
            </div>
        </>
    )
}

export default NotFound;