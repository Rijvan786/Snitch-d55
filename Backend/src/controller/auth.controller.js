import { config } from "../config/config"
import userModel from "../models/auth.model"
import jwt from "jsonwebtoken"
import { validatedAndFormat } from "../validator/contact.validator"
 
/***TOKEN sender function  */

async function SendTokenResponse(res,user,message){
    const token=jwt.sign({
        id:user._id
    },
    config.JWT_SECRET,{expiresIn:"7d"}
)

res.cookie("token",token)
res.status(200).json({
    message,
    success:true,

    user:{
        id:user_id,
        email:user.email,
        contact:user.contact,
        fullname:user.fullname,
        role:user.role
    }
})
}



export async function RegisterController(req,res){
    const {email,fullname,password,contact,isSeller}=req.body
    try{
         const validContact= validatedAndFormat(contact)
         if(!validContact){
            return res.status(400).json({message:"Contact number is Invalid"})
         }
       const isExist=await userModel.find({
        $or:[
            {email},
            {validContact}
        ]
       })
       if(isExist){
        return res.status(409).json({
            message:`User  ${isExist.email==email?"email is allready registered":"is All ready registered"}`
        })
       }
       const user=await userModel.create({
        fullname,
        email,
        password,
        contact: validContact,
        countryCode:validContact.slice(0,3),
        role:isSeller?"seller":"buyer"
       })
       SendTokenResponse(res,user,"User is register successfully")

    }
    catch(err){
      console.log(err);
      return  res.status(500).json({message:"Server Error"})
    }

}

export async function LoginController(req,res){
        const {email,fullname,password}=req.body
        try{
            const user=await userModel.find({
           $or:[{ fullname:fullname,},
            {email:email}
           ]
        })
        if(!user){
            return res.status(404).json({message:"User is not found"})
        }
        

        }
        catch(err){
            return res.status(400).json({message:"Internal Server Error"})
        }
}
