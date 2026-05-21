import ioredis from "ioredis"
import { config } from "./config.js"

export const client=new ioredis({
    host:config.REDIS_HOST,
    port:config.REDIS_PORT,
    password:config.REDIS_PASSWORD
})

client.on("connect",()=>{
    console.log("Redis is connected");
})

client.on("error",()=>{
    console.log("Redis Server error");
})

