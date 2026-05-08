import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
import userModel from "../models/user.model.js"

export   async  function  AuthenticateUser(req,res,next){
             const token=req.cookies.token
             if(!token){
               return res.status(400).json({
                  message:"User is not provided Token"
               })
             }

             try {
               const encrypted=jwt.verify(token,config.JWT_SECRET)
               const user =await userModel.findById(encrypted.id)
               
               if(!user){
                  return res.status(400).json({
                     message:"User is Unauthorized"
                  })
                
               }   
                req.user=user
                console.log(user);
                  next() 

               
             } catch (error) {

               res.status(400).json({
                  message:"User is Unauthorized"
               })
               
             }

}


export async function AuthenticateSeller(req,res,next){
     const token=req.cookies.token
     if(!token){
        return res.status(404).json({
            message:"Unauthorized not provided token"
        })
     }
     try{
        const decoded=jwt.verify(token,config.JWT_SECRET)

         const user=await userModel.findById(decoded.id)

         if(!user){
            return res.status(404).json({message:"user is not found"})
         }
         if(user.role !=="seller"){
         return res.status(400).json({message:"Forbidden"})
         }

        
         req.user=decoded
         next()
     }
     catch(err){
        return res.status(400).json({
            message:`Bad Request ${err}`
        })
     }
}

