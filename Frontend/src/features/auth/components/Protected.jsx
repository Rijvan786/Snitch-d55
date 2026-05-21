import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth';

const Protected = ({children,role="buyer"}) => {
     const {handleGetMe}=useAuth()
     const user=useSelector(state=>state.auth.User)
     const navigate=useNavigate()
console.log(user);
try {
   



 useEffect(()=>{
  async function fetch() {
   const data= await   handleGetMe() 
if(!user){
   navigate("/login")
}
if(data.role==="seller"){
      navigate("/seller/Dashboard")
     }
     if(data.role !==rolex){
            navigate("/") 
        }  
  }
  fetch()
   
  },[])





} catch (error) {
    console.log(error);
}


  return children
}

export default Protected