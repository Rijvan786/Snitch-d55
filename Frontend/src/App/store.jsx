import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "../features/auth/state/authslice"
export const store=configureStore({
    reducer:{
        auth:AuthReducer
    }
})