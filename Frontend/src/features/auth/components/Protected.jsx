import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router';
import { useAuth } from '../hook/useAuth';

const Protected = ({children,role="buyer"}) => {
     const {handleGetMe}=useAuth()
     const user=useSelector(state=>state.auth.User)
console.log(user);
try {
   



 useEffect(()=>{
    handleGetMe()
   
  },[])


console.log(role);
 if(role==="seller" && user.role==="seller"){
    return children

}
else if(!user){
    return <Navigate to="/login"/>
}
 else if(user.role !== role){
     return <Navigate to="/"/>
}



} catch (error) {
    console.log(error);
}


  return children
}

export default Protected