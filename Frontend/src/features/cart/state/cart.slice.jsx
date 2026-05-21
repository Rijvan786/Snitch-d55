import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
         currency:null,
        TotalPrice:null,
        items:[]
    },

    reducers:{
        setCart:(state,action)=>{
          console.log(action.payload);
          state.items=action.payload.items
          state.TotalPrice=action.payload.totalPrice,
          state.currency=action.payload.currency
       
         
        },
        setTotalPrice:(state,action)=>{
                const {productId,variantId}=action.payload
            
        },

        setItems:(state,action)=>{
                const payload=action.payload ?? []
            state.items=Array.isArray(payload)?payload:[]

        },
        addItem:(state,action)=>{
         state.items.push(action.payload)
        },
        incrementCartItem:(state,action)=>{
            const {productId,variantId}=action.payload
            console.log(productId,variantId,"Variant & ProductId");
            state.items=state.items.map(item=>{
        
                if(item.product._id===productId && item.variants===variantId){
                    state.TotalPrice=state.TotalPrice+item.price.amount/item.quantity
                    return {...item,quantity:item.quantity+1,price:{amount:item.price.amount+item.price.amount/item.quantity}}
                }
                else{
                    return item
                }
            })
        },
         decrementCartItem:(state,action)=>{
            const {productId,variantId}=action.payload

            state.items=state.items.map(item=>{
            state.TotalPrice=state.TotalPrice-item.price.amount/item.quantity
    
                if(item.product._id===productId && item.variants===variantId){
                    return {...item,quantity:item.quantity-1,price:{amount:item.price.amount-item.price.amount/item.quantity}}
                }
                else{
                    return item
                }
            })
        },
        DeleteCartItemsLive:(state,action)=>{
            const {productId,variantId}=action.payload
            console.log(productId,variantId,"DeleteSlice");
             state.items = state.items.filter(
        (item) => !(item.product?._id === productId && item.variants === variantId)
    );
        }
    }
})



export const {setItems,
    addItem,
    incrementCartItem,
    decrementCartItem,
    DeleteCartItemsLive,
    setCart,
    setTotalPrice
  }=cartSlice.actions
export default cartSlice.reducer