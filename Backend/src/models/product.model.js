import mongoose from "mongoose";
// tittle description price images,user
const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    price:{
          amount:{
          type:Number,
          required:true  
        },
        currency:{
            type:String,
            enum:["USD","EUR","GBP","JPY","CNY","INR"],
            default:"INR"
        },
      
    },
    images:[{
        url:{
            type:String,
            required:true
        }
    }]

},
{
    timestamps:true
})

const ProductModel=mongoose.model("products",ProductSchema)

export default ProductModel