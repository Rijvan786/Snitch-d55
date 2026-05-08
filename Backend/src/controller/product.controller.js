import jwt from "jsonwebtoken"
import ProductModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"
import VariantModel from "../models/Variant.model.js";



export async function CreateProductController(req,res){

 try{
     let {title,description,priceCurrency,priceAmount}=req.body; 
           priceAmount=req.body.priceAmount
                     Number(priceAmount)
    console.log("CreateProductController",title,description,typeof(priceAmount),);

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
 }catch(err){
  console.log(err.message,"In CreateProductControllerPage");
 }
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


export async function GetallProductController(req,res){
  
  const products=await ProductModel.find()

  res.status(200).json({
    message:"Get all products",
    products
  })
}

export async function ViewProductDetailController(req,res) {
        const {ProductId}=req.params
         
        const product=await ProductModel.findOne({_id:ProductId})

        if(!product){
          return res.status(404).json({
            message:"Not product for this ahead"
          })
        }

        res.status(200).json({
          product
        })
  
}
export async function EditProductController(req,res){
   try {

    const {ProductId}=req.params
    let {title,description,priceAmount}=req.body; 
    console.log(ProductId);
 const product=await ProductModel.findByIdAndUpdate(
      {_id:ProductId}
,
     {
        title:title
      },
    {description:description},
    {priceAmount:priceAmount})

  res.status(200).json({
    message:"Edit product successfully "
  })
    
   } catch (error) {
          console.log(error.message);
  
}
}

export async function AddVariantController(req,res){
  try{
        const {ProductId}=req.params
   let {title,description,priceCurrency,priceAmount,stock,size,}=req.body; 
           priceAmount=req.body.priceAmount
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
      

      const product =await VariantModel.create({
        Product:ProductId,
        title,
        description,
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR"
        },
        stock,
        size,
        images,
        seller:seller.id
      })
      res.status(200).json({
        message:"Product created successfully",
        success:true,
        product
      })
  }
  catch(err){
    console.log(err.message);
  }
  
}

export async function ViewRelatedVariantController(req,res) {
         const {VariantId}=req.params
         console.log(VariantId,"Variantid");
        const RelatedVariant=await VariantModel.find({Product:VariantId})


        res.status(200).json({
          message:"Fetch Successfully of related Variant ",
          RelatedVariant
        })
}
