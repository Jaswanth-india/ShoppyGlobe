import './index.css';

// Components
import App from './App.jsx';
import Cart from "./components/Cart.jsx";
import NotFound from "./components/NotFound.jsx";
import Search from "./components/Search.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

// Functions,utilities
import React,{ lazy,Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const About = lazy(()=>import("./components/About.jsx"));

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<NotFound/>,
        children:[
            {
                path:"/",
                element:
                <main>
                    <Search/>
                    <ProductList/>
                </main>,
            },
            {
                path:"/cart",
                element:<Cart/>,
            },
            {
                path:"/about",
                element:(
                <Suspense fallback={<div>Loading...</div>}>
                    <About/>
                </Suspense>
                )
            },
            {
                path:"/product/:id",
                element:<ProductDetails/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)