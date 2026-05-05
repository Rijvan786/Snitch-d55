import { createSlice } from "@reduxjs/toolkit";


const  Authslice=createSlice({
    name:"auth",
    initialState:{
        User:null,
        Error:null,
        Loading:true
    },

    reducers:{
        setUser:(state,action)=>{
            state.User=action.payload
        },
          setError:(state,action)=>{
            state.Error=action.payload
        },
          setLoading:(state,action)=>{
            state.Loading=action.payload
        }
    }
})

export const {setUser,setError,setLoading} =Authslice.actions

export default Authslice.reducer