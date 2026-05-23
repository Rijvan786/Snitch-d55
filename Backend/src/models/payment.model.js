import mongoose, { mongo } from "mongoose";
import priceSchema from "./price.model.js";

const paymentSchema=new mongoose.Schema({
    status:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    price:{
        type:priceSchema,
        require:true
    },
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    orderItems:[
        {
            title:String,
            productId:mongoose.Schema.Types.ObjectId,
            variantId:mongoose.Schema.Types.ObjectId,
            quantity:Number,
            images:[{url:String}],
            description:String,
            price:priceSchema
        }
    ]
},
{timestamps:true}
)


const paymentModel=mongoose.model("payment",paymentSchema)

export default paymentModel