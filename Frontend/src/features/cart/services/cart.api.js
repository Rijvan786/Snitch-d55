import axios from "axios";

const CartApiInstance=axios.create({
  baseURL:"https://snitch-d55.onrender.com/api/cart",
  withCredentials:true
})


export async function AddToItem({productId,variantId,quantity}){
    const response=await CartApiInstance.post(`/add/${productId}/${variantId}`,
      {quantity})
    return response.data
}

export async function GetCart() {

  const response=await CartApiInstance.get("/")
  

  return response.data
  
}

export async function IncrementCartItemApi({productId,variantId,quantity,price}) {
   console.log(quantity,price,"API")
  const response=await CartApiInstance.patch(`/quantity/increment/${productId}/${variantId}`,
   { quantity,
    price})
  return response.data
  
}

export async function DecrementCartItemApi({productId,variantId,quantity,price}) {

  const response=await CartApiInstance.patch(`/quantity/decrement/${productId}/${variantId}`,
   { quantity,
    price})

  return response.data
  
}

export async function DeleteCartItem({productId,variantId}) {
  
  const response=await CartApiInstance.patch(`/Delete/${productId}/${variantId}`)
  
  return response.data
}

export async function CreateCartOrder(){

  const response=await CartApiInstance.post("/payment/order/create")

  return response.data
}


export async function VerifyCartOrder( {razorpay_order_id,razorpay_payment_id,razorpay_signature}) {
   const response=await CartApiInstance.post("/payment/verify/create",
     {razorpay_order_id,razorpay_payment_id,razorpay_signature})

     return response.data
}
