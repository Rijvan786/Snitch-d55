import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/authslice"
import productReducer from "../features/products/product.slice"
import cartReducer from "../features/cart/state/cart.slice"

export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        product:productReducer,
        cart:cartReducer
       
    }
})