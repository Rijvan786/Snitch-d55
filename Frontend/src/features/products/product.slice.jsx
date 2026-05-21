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

        
        
    }

  
})

export const {setProducts,Setallproduct,SetViewProduct}=productSlice.actions

export default productSlice.reducer