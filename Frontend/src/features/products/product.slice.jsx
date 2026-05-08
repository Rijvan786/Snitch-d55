import {createSlice} from "@reduxjs/toolkit"


const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        allProduct:[],
        ViewProduct:[],
        items:[]
       
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        Setallproduct:(state,action)=>{ 
            state.allProduct=action.payload
        },
        SetViewProduct:(state,action)=>{
            state.ViewProduct=action.payload
        },
      addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        if (quantity < 1) {
           state.items = state.items.filter(i => i._id !== id);
        } else {
           item.quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
        
        
    }

  
})

export const {setProducts,Setallproduct,SetViewProduct,updateQuantity,removeFromCart,clearCart,addToCart}=productSlice.actions

export default productSlice.reducer