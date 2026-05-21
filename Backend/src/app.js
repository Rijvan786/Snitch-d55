import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from "./config/config.js"
import AuthRouter from "./routes/auth.route.js"
import ProductRouter from "./routes/product.route.js"
import CartRouter from "./routes/cart.route.js"


const app=express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",AuthRouter)
app.use("/api/products",ProductRouter) 
app.use("/api/cart",CartRouter) 

app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},(accessToken, refreshToken,profile,done)=>{
    return done(null,profile)
}))







export default app