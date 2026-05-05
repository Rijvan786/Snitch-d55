import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children,role="buyer"}) => {

    const Loading=useSelector(state=>state.auth.Loading)
    const User=useSelector(state=>state.auth.User)
    console.log(User);
    if(Loading){
        return (<main>
            <h1>Loading</h1>
        </main>)
    }
    if(!User){
        return <Navigate to="/login" replace />
    }
    if(User.role==!role){
        return <Navigate to="/" />  
    }
  return children
}

export default Protected