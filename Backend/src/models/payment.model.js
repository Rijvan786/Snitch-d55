import mongoose from "mongoose";
import priceSchema from "./price.model.js";

const PaymentSchema=new mongoose.Schema({
    status:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    price:{
        type:priceSchema,
        required:true
    },
    
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String,
     },
     user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
     },

     orderItems:[
  {   title:String,
     productId:mongoose.Schema.Types.ObjectId,
     variantId:mongoose.Schema.Types.ObjectId,
     description:String,
     price:priceSchema,
     quantity:Number,
     images:[{url:String}],
 }

     ]
    
},

{timestamps:true}
)


const PaymentModel=mongoose.model("payment",PaymentSchema)

export default PaymentModel