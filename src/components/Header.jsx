// Styling
import "./Header.css";
import logo from "../assets/logo.png";

// Router imports
import { Link } from "react-router-dom";

function Header(){
    document.querySelector("head link").type="";
    document.querySelector("head link").href=logo;
    return(
        <>
            <header>
                <div><img src={logo} /></div>
                <div><Link to="/">Home</Link></div>
                <div><Link to="/about">About</Link></div>
                <div><Link to="/cart">Cart</Link></div>
                <div><Link to="/login">Login</Link></div>
                <div><Link to="/register">Register</Link></div>
                <div id="sample">Sample</div>
            </header>
            <hr/>
        </>
    )
}

export default Header;