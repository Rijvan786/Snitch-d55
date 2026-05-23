import Razorpay from "razorpay"

import { config } from "../config/config.js"
console.log(config.RAZORPAY_KEY_ID,config.RAZORPAY_KEY_SECRET,"Hii");

const razorpay=new Razorpay({
    key_id:config.RAZORPAY_KEY_ID,
    key_secret:config.RAZORPAY_KEY_SECRET
})

export async function createOrder({amount,currency="INR"}){
   try{
    const option ={
    amount:amount*100,
    currency
   }
  // 1 INR= 100 Paisa
   const order=await razorpay.orders.create(option)
      
   return order
   }
   catch(err){
    console.log(err,"Erro");
   
   }
}