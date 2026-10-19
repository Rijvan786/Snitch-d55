import { useDispatch } from "react-redux";
import { setLoading,setUser,setError } from "../state/authslice";
import { getMe,  Login, Register, Logout, ResendMail, ForgetPasswordMail, ForgetPassword } from "../service/auth.api.js";
import { setItems } from "../../cart/state/cart.slice.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function useAuth(){
    const dispatch=useDispatch()
   

    async function handleRegister({email,fullname,contact,password,isSeller}){
        try{
              dispatch(setLoading(true))
              
              const data=await Register({email,fullname,contact,password,isSeller})
              dispatch(setUser(data.user))
        }
        catch(err){
                      dispatch(setError(err.message))
        }
        finally{
                 dispatch(setLoading(false))
        }
    }


    async function handleLogin({fullname,email,password}){
        try{
              dispatch(setLoading(true))
              const data=await Login({fullname,email,password})
              console.log(data);
              
              dispatch(setUser(data.user))
              return data.user
        }
        catch(err){
                      dispatch(setError(err.message))
        }
        finally{
                 dispatch(setLoading(false))
        }
    }

      async function handleResendMail({email}){
        try{
              dispatch(setLoading(true))
              
              const data=await ResendMail({email})
              dispatch(setUser(data.user))
        }
        catch(err){
                      dispatch(setError(err.message))
        }
        finally{
                 dispatch(setLoading(false))
        }
    }

      async function handleForgetMail({email}){
        try{
              dispatch(setLoading(true))
              
              const data=await ForgetPasswordMail({email})
              dispatch(setUser(data.user))
        }
        catch(err){
                      dispatch(setError(err.message))
        }
        finally{
                 dispatch(setLoading(false))
        }
    }

      async function handleForgetPassword({NewPassword}){
        try{
              dispatch(setLoading(true))
              
              const data=await ForgetPassword({NewPassword})
              dispatch(setUser(data.user))
        }
        catch(err){
                      dispatch(setError(err.message))
        }
        finally{
                 dispatch(setLoading(false))
        }
    }


    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data=await  getMe()
            console.log(data);
            
            
          dispatch(setUser(data.user)) 
          return data.user
        }
      catch(err){
       dispatch(setError(err.message))
      }  
      finally{
      dispatch(setLoading(false))
      
    }
  }

    async function handleLogout(){
        try{
            dispatch(setLoading(true))
            await Logout()
        }
        catch(err){
            // still clear even if API fails
            console.warn("Logout API error:", err.message)
        }
        finally{
            dispatch(setUser(null))
            dispatch(setItems([]))
            dispatch(setLoading(false))
            
        }
    }
    
    useEffect(()=>{
        // handleGetMe()
    })

    return{handleLogin,handleRegister,handleResendMail,handleForgetMail,handleForgetPassword,handleGetMe,handleLogout}
}
