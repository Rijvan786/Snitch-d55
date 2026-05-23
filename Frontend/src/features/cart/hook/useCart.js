import { AddToItem, createCartOrder, DecrementCartItemApi, DeleteCartItem, GetCart,  IncrementCartItemApi, verifyCartOrder} from "../services/cart.api.js";

import { useDispatch } from "react-redux"

import {  setItems,incrementCartItem, decrementCartItem, DeleteCartItemsLive, setCart,} from "../state/cart.slice.jsx";
import { setError, setLoading } from "../../auth/state/authslice.jsx";


export function useCart(){

    const dispatch=useDispatch()
    
    async function handleAddItem({productId,variantId,quantity}) {
        console.log(productId,variantId);
        try {
              dispatch(setLoading(true))

              const data=await AddToItem({productId,variantId,quantity})
              await handleGetItems()
           return data
        } catch (error) {
            dispatch(setError(error.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetItems(){
        try {
                 dispatch(setLoading(true))
                 const data=await GetCart()
                 console.log(data);

                 dispatch(setCart(data.cart))
               ;
                 // data IS the cart object: { _id, user, items, __v }
                
             
                
              
             
                
             
        } catch (error) {
           dispatch(setError(error.message)  )
        } 
        finally{
            dispatch(setLoading(false))
        }
    }
   async function handleIncrementCartItem({productId,variantId,quantity,price}){
   console.log(quantity,price,"PriceP&Quntity");
        
       const data=await IncrementCartItemApi({productId,variantId,quantity,price})
       dispatch(incrementCartItem({productId,variantId}))
        
   }

     async function handleDecrementCartItem({productId,variantId,quantity,price}){
        console.log(quantity,price,variantId,"PRice.Quantity");
        console.log(productId,variantId);
       const data=await DecrementCartItemApi({productId,variantId,quantity,price})
       
       dispatch(decrementCartItem({productId,variantId}))
         
}

   async function handleDeleteCartItem({productId,variantId}) {
             const data=await DeleteCartItem({productId,variantId})
              dispatch(DeleteCartItemsLive({productId,variantId}))
             return data
   }

   async function handleCreateCartOrder() {
    const data=await createCartOrder()
    return data.order
   }

   async function handleVerifyCartOrder({ razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature}) {
        console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature);
    const data=await verifyCartOrder({ razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
})
return data.success
    
   }
   

    return {handleAddItem,
        handleGetItems,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleDeleteCartItem,
        handleCreateCartOrder,
        handleVerifyCartOrder
    }
}

;