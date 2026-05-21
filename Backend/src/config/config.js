import dotenv  from "dotenv";
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("Mongo_URI is not defined in environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")

}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined environment variables")
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined environment variables")

}
if(!process.env.NODE_ENV){
    throw new Error("NODE_ENV is not defined environment variables")

}
if(!process.env.IMAGEKIT_API_KEY){
    throw new Error("IMAGEKIT_API_KEY is not defined environment variables")

}



export const config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    NODE_ENV:process.env.NODE_ENV || "development",
    IMAGEKIT_API_KEY:process.env.IMAGEKIT_API_KEY,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_PASSWORD:process.env.REDIS_PASSWORD
}