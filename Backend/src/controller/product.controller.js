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
          message:"Get product Successfully",
          product
        })
  
}

export async  function  AddProductVariantController(req,res){
      
          const ProductId=req.params.ProductId
           
          const product=await ProductModel.findOne({
            _id:ProductId,
            seller:req.user.id
          })

          if(!product){
            return res.status(404).json({
              message:"Product is not found"
            })
          }
           const files=req.files;
           const images=[];

           if(files || files.length !==0){

             (await Promise.all(files.map(async(file)=>{
              const image=await uploadFile({
              buffer:file.buffer,
              fileName:file.originalname,
            })
             return image
             }))).map(image=>images.push(image))
           
           }
           const price =req.body.price
           const stock=req.body.stock
           const attributes=JSON.parse(req.body.attributes || "{}")
           console.log(product,images,price,stock,attributes);

           product.variants.push({
            images,
            price:{
              amount:price || product.price.amount,
              currency:req.body.priceCurrency|| product.price.currency,
            },
              stock,
              attributes
           })
           await product.save()
           return res.status(200).json({
            message:"Product Variant added Successfully",
            success:true,
            product
           })
}