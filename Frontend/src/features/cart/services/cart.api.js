import axios from "axios";

const CartApiInstance=axios.create({
  baseURL:"http://localhost:3000/api/cart",
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

export async function createCartOrder() {
   const response=await CartApiInstance.post("/payment/create/order")
;
   return response.data
}

export async function verifyCartOrder({razorpay_order_id,razorpay_payment_id,razorpay_signature}) {
  const response=await CartApiInstance.post("/payment/verify/order",
  {  razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,}

  )
  return response.data
}