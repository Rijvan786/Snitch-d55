import jwt from "jsonwebtoken"
import ProductModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"



export async function CreateProductController(req,res){

    const {title,description,priceCurrency}=req.body; 
             const   priceAmount=req.body.priceAmount
                     Number(priceAmount)
    console.log("CreateProductController",title,description,typeof(priceAmount),priceCurrency);

    const seller=req.user;

      const images=await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname
        })
      }))
      console.log("IMages",images,);
      

      const product =await ProductModel.create({
        title,
        description,
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR"
        },
        images,
        seller:seller.id
      })
      res.status(200).json({
        message:"Product created successfully",
        success:true,
        product
      })
}

export async function GetSellerProductController(req,res){
    const seller=req.user
    console.log(seller);

     const products=await ProductModel.find({seller:req.user.id})

     res.status(200).json({
      message:"User Fetch product successfully",
      success:true,
      products

     })

}


