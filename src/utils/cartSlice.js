import { createSlice } from "@reduxjs/toolkit";

// Slice for cart
let cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers:{
        //Adding items to the cart
        addItem:(state,action)=>{
            state.items.push(action.payload);
        },
        //Removing items from the cart
        removeItem:(state,action)=>{
            delete state.items[action.payload];
        }
    }
})

export default cartSlice.reducer;
export const {addItem,removeItem,increaseCounter}=cartSlice.actions;