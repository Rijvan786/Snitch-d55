import express from "express"


const app=express()
import Authrouter from "./routes/auth.route.js"
app.use("/api/web",Authrouter)


export default app