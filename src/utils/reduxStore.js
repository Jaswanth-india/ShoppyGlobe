import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

let reduxStore=configureStore({
    reducer:{
        cart:cartSlice,
    }
})

export default reduxStore;