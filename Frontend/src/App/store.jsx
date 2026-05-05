import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/authslice"
import productReducer from "../features/products/product.slice"
export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        product:productReducer
    }
})