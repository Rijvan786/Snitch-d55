import { config } from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { validatedAndFormat } from "../validator/contact.validator.js"
import bcrypt from "bcryptjs"
 
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
        id:user._id,
        email:user.email,
        contact:user.contact,
        fullname:user.fullname,
        role:user.role
    }
})
}



export async function RegisterController(req,res){
    const {email,fullname,password,contact,isSeller}=req.body
    console.log(fullname,email,contact,password,isSeller);
    try{
         const validContact= validatedAndFormat(contact)
         console.log(validContact);
         if(!validContact){
            return res.status(400).json({message:"Contact number is Invalid"})
         }
       const isExist=await userModel.findOne({
        $or:[
              {email:email},
              {contact:validContact}
        ]
       })
       
       
       if(isExist){
        return res.status(409).json({
            message:`User  ${isExist.email==email?"email is all ready registered":"is All ready registered"}`
        })
       }
       const user=await userModel.create({
        fullname,
        email,
        password,
        contact:validContact,
        countryCode:validContact.slice(0,3),
        role:isSeller?"seller":"buyer"
       })
      await SendTokenResponse(res,user,"User is register successfully")

    }
    catch(err){
      console.log(err);
      return  res.status(500).json({message:"Server Error"})
    }
   
}

export async function LoginController(req,res){
        const {fullname,email,password}=req.body;
        console.log(email,password);
        try{
            const user=await userModel.findOne({
           $or:[{ fullname:fullname,},
            { email:email}
           ]
        }).select("+password")
        console.log(user);
        if(!user){
            return res.status(404).json({message:"User is not found"})
        }
    const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({
                message:"user enter Invalid password"
            })
        }
             await SendTokenResponse(res,user,"User is logged In successfully")
        }
        catch(err){
            return res.status(400).json({message:"Internal Server Error err by login"})
        }
}

export async function GoogleCallback(req,res){
    console.log(req.user);

    const {id,displayName,emails,photos}=req.user;
    const email=emails[0].value
    const photo=photos[0].value
    let user=await userModel.findOne({
        email:email
    }).select("+password")
    
    if(!user){
      user=  await userModel.create({
          email,
          googleId:id,
          fullname:displayName  
        })
    }
    const token=jwt.sign({
        id:user._id,

    },
       config.JWT_SECRET, {
        expiresIn:"7d"
       }
)
res.cookie("token",token)
    if(user.role=="seller"){
        res.redirect("http://localhost:5173/seller/dashboard")
}
else if(user.role=="buyer"){
    res.redirect("http://localhost:5173/")
}
    }


export async function GetmeController(req,res){
    const user=req.user

    
   

console.log("okeoke",user);
        res.status(200).json({
            message:"Fetch user is successfully",
        user:{
        id:user._id,
        email:user.email,
        contact:user.contact,
        fullname:user.fullname,
        role:user.role
            }
        })
    
}

