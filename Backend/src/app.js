import express from "express"
import helmet, { contentSecurityPolicy } from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from "./config/config.js"
import AuthRouter from "./routes/auth.route.js"
import ProductRouter from "./routes/product.route.js"
import CartRouter from "./routes/cart.route.js"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

const app=express()
app.use(express.json())
app.use(express.static("./public"))

app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({         
    origin:"http://localhost:5173",
    credentials:true
}))
app.get('/test', (req, res) => {
  res.send(`<h1>
    <script>
        alert("Hacked ")
    </script>
  </h1>`);
});
app.use("/api/auth",AuthRouter)
app.use("/api/products",ProductRouter) 
app.use("/api/cart",CartRouter) 

app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID2,
    clientSecret:config.GOOGLE_CLIENT_SECRET2,
    callbackURL:"https://snitch-d55.onrender.com//api/auth/google/callback"
},(accessToken, refreshToken,profile,done)=>{
    return done(null,profile)
}))


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,".","../public/index.html"))
})





export default app