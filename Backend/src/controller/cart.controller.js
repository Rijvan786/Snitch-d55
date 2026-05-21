import { stockOfVariant } from "../dao/product.dao.js"
import CartModel from "../models/Cart.model.js"
import priceSchema from "../models/price.model.js"
import ProductModel from "../models/product.model.js"


export async function AddTOCartController(req,res){
    const {productId,variantId}=req.params
   const {quantity}=req.body
   console.log(productId,variantId,quantity);
    const product=await  ProductModel.findOne({
        _id:productId,
        "variants._id":variantId
    })
    if(!product){
        return res.status(404).json({
            message:"Product or variant not found",
            success:false
        })
    }
    const stock=await stockOfVariant(productId,variantId)
    console.log(stock);

    // cart is all ready  exist 
 const cart =(await CartModel.findOne({user:req.user._id}) )|| await CartModel.create({
  user:req.user._id 
}) 
   // cart in product already so quantity will be increase by 1
  const  IsProductAlreadyInCart=cart.items.some(item=>item.product.toString()===productId && item.variants?.toString()===variantId)


//   product already in cart so update quantity
  if(IsProductAlreadyInCart){
           const quantityInCart=cart.items.find(item=>item.product.toString()===productId && item.variants?.toString()===variantId).quantity
          
           if(quantityInCart+quantity>stock){
                 return res.status(400).json({
                    message:`Only ${stock} Items left in  stock,and you already have ${quantityInCart} in your cart`,
                    success:false,

                 })    
           }
           await CartModel.findOneAndUpdate(
          {
             user:req.user._id,
            "items.product":productId,"items.variants":variantId},
            {$inc:{"items.$.quantity":quantity}},
            {returnDocument:"after"}
           )
          
            return res.status(200).json({
                message:"Cart Update Successfully",
                success:true
            })

  }
   
  if(quantity>stock){
    return res.status(400).json({
        message:`Only ${stock} items left in stock`,
        success:true
    })
  }
   

    cart.items.push({
        product:productId,
        variants:variantId,
        quantity:quantity,
        price:product.price,

    })

    await cart.save()
    return res.status(200).json({
        message:"Product added to cart successfully",
        success:true
    })
}


export async function  getCartController(req,res){
    const user=req.user

    let  cart =await CartModel.findOne({user:user._id}).populate("items.product")


    if(!cart){
        cart=await CartModel.create({user:user._id})
                                         
      
    }
    

      
        return res.status(200).json({
            message:"Cart fetched successfully",
            success:true,
            cart
        })  


    
}
   
export async function IncrementCartItemQuantityController(req,res){
    const {price}=req.body
    const {productId,variantId}=req.params
 try{   
    
    
        console.log(price,"PRice&Quantity");
    console.log(`${variantId} price${productId}`);


    const product=await ProductModel.findOne({
        _id:productId,
        "variants._id":variantId
    })
  
       if(!product){
        return res.status(404).json({
            message:"Product or Variant  is not found"
        })
       }

       const cart=await CartModel.findOne({
    user:req.user._id
       })
    if(!cart){
        return res.status(404).json({
            message:"Card is not found"
        })
    }
    const stock=await stockOfVariant(productId,variantId)

    const ItemQuantityCart=cart.items.find(item=>item.product.toString()===productId && item.variants?.toString()===variantId)?.quantity || 0
     if(ItemQuantityCart+1>stock){
        return res.status(400).json({
            message:`Only ${stock} items left in stock . and you already have ${ItemQuantityCart} in your cart`,
            success:false
        })
     }

    await CartModel.findOneAndUpdate({
        user:req.user._id,"items.product":productId,"items.variants":variantId
     },
      {$inc:{"items.$.quantity":1}},
    
    
    )
  
      
 
 

  await CartModel.findOneAndUpdate({user:req.user._id,
        "items.product":productId,"items.variants":variantId
    },{$inc:{"items.$.price.amount":price}},
   
      
    {returnDocument:"after"})
 
   

    res.status(200).json({
        message:"Cart Item is Increment  successfully"
    })
 } 
 catch(err){
    console.log(err);
    return res.status(500).json({
        message:"Inter server Error ",
        err:err
    })
 }
}
export async function DecrementCartItemQuantityController(req,res){
        const {productId,variantId}=req.params
        const {price,quantity}=req.body
    console.log(`variantId${variantId} price${productId}`);


    const product=await ProductModel.findOne({
        _id:productId,
        "variants._id":variantId
    })
  
       if(!product){
        return res.status(404).json({
            message:"Product or Variant  is not found"
        })
       }

       const cart=await CartModel.findOne({
    user:req.user._id
       })
    if(!cart){
        return res.status(404).json({
            message:"Card is not found"
        })
    }
    const stock=await stockOfVariant(productId,variantId)

  

     await CartModel.findOneAndUpdate({
        user:req.user._id,"items.product":productId,"items.variants":variantId
     },
      {$inc:{"items.$.quantity":-1}},
    
    
    )
   await CartModel.findOneAndUpdate({user:req.user._id,
        "items.product":productId,"items.variants":variantId
    },{$inc:{"items.$.price.amount":-price}},
   
      
    {returnDocument:"after"})
 

    res.status(200).json({
        message:"Cart Item is Decrement  successfully"
    })
  
}

export async function DeleteCartController(req,res){
        const {variantId,productId}=req.params
        console.log(`variantId ${variantId} productId ${productId}`);

        const product=await ProductModel.find({
            _id:productId,
            "variants._id":variantId
        })

        if(!product){
            return res.status(404).json({
                message:"Product is not found"
            })
        }

        const Cart=await CartModel.findOne({
            user:req.user._id
        })
        if(!Cart){
            return res.status(404).json({
                message:"Cart is not found"
            })
        }

        await CartModel.findOneAndUpdate(
            {user:req.user._id},
          { $pull: {
             "items":{
                "product":productId,
                "variants":variantId
            }
        },},
        {new:true}
        
    )

        res.status(200).json({
            message:"User is Delete successfully Cart Item"
        })
}