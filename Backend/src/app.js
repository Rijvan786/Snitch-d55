import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app=express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(morgan("dev"))
app.use(cookieParser())
import AuthRouter from "./routes/auth.route.js"
app.use("/api/web",AuthRouter)


export default app