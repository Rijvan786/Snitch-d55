import mongoose from "mongoose";
import priceSchema from "./price.model.js";


const CartSchema=new mongoose.Schema({
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

      },
   items:[{
     product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
        variants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products.variants"
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:priceSchema,   
        required:true
    }
},
   ]


})

const CartModel=mongoose.model("cart",CartSchema)
export default CartModel