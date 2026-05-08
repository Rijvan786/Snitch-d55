import mongoose from "mongoose";

const VariantSchema=new mongoose.Schema({
    
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
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
    stock:{
     type:String,
     required:true

      },
      size:{
        type:String,
        required:true,
        enum:["S","M","L","XL","XXL"]
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

const VariantModel=mongoose.model("VariantModel",VariantSchema)

export default VariantModel