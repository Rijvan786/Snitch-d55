import dotenv  from "dotenv";
dotenv.config()


const {MONGO_URI,JWT_SECRET,NODE_ENV,PORT,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REFRESH_TOKEN,GOOGLE_CLIENT_ID2,GOOGLE_CLIENT_SECRET2,EMAIL_USER,EMAIL_PASSWORD,
IMAGE_KIT_API_KEY,RAZORPAY_KEY_ID,RAZORPAY_KEY_SECRET} =process.env

if(!MONGO_URI){
    throw new Error("Mongo_URI is not defined in environment variables")
}

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")

}
if(!NODE_ENV){
    throw new Error("NODE_ENV is not defined environment variables")

}

if(!PORT){
    throw new Error("PORT is not defined environment variables")

}


if(!GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined environment variables")
}
if(!GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined environment variables")

}

if(!GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined environment variables")

}

if(!GOOGLE_CLIENT_ID2){
    throw new Error("GOOGLE_CLIENT_ID2 is not defined environment variables")

}

if(!GOOGLE_CLIENT_SECRET2){
    throw new Error("GOOGLE_CLIENT_SECRET2 is not defined environment variables")
}

if(!EMAIL_USER){
    throw new Error("EMAIL_USER is not defined environment variables")

}
if(!EMAIL_PASSWORD){
    throw new Error("EMAIL_PASSWORD is not defined environment variables")
}
if(!IMAGE_KIT_API_KEY){
    throw new Error("IMAGEKIT_API_KEY is not defined environment variables")

}

if(!RAZORPAY_KEY_ID){
    throw new Error("RAZORPAY_KEY_ID  is not defined environment variables")
}

if(!RAZORPAY_KEY_SECRET){
     throw new Error("RAZORPAY_KEY_SECRET  is not defined environment variables")
}
    


export const config={
    MONGO_URI:MONGO_URI,
    
    JWT_SECRET:JWT_SECRET,
    
    GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,
    
    GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,
    
    GOOGLE_CLIENT_ID2:GOOGLE_CLIENT_ID2,
    
    GOOGLE_CLIENT_SECRET2:GOOGLE_CLIENT_SECRET2,

    GOOGLE_REFRESH_TOKEN:GOOGLE_REFRESH_TOKEN,
    
    NODE_ENV:NODE_ENV || "development",
    
    PORT:PORT,
    
    IMAGE_KIT_API_KEY:IMAGE_KIT_API_KEY,
    
    EMAIL_USER:EMAIL_USER,
    
    EMAIL_PASSWORD:EMAIL_PASSWORD,
    
    RAZORPAY_KEY_ID:RAZORPAY_KEY_ID,
    
    RAZORPAY_KEY_SECRET:RAZORPAY_KEY_SECRET
 
}
