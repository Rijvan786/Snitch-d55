import { useDispatch } from "react-redux";
import { setLoading,setUser,setError } from "../state/authslice";
import { getMe,  Login, Register } from "../service/auth.api.js";
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


    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data=await  getMe()
            console.log(data);
            
          dispatch(setUser(data.user)) 
        }
      catch(err){
       dispatch(setError(err.message))
      }  
      finally{
      dispatch(setLoading(false))
      
    }
  }

    
    return{handleLogin,handleRegister,handleGetMe}
}
