import { useDispatch } from "react-redux";
import { setLoading,setUser,setError } from "../state/authslice";
import { Login, Register } from "../service/auth.api";
export function useAuth(){
    const dispach=useDispatch()

    async function handleRegister({email,fullname,contact,password,isSeller}){
        try{
              dispach(setLoading(true))
              const data=await Register({email,fullname,contact,password,isSeller})
              dispach(setUser(data.user))
        }
        catch(err){
                      dispach(setError(err.message))
        }
        finally{
                 dispach(setLoading(false))
        }
    }


    async function handleLogin({fullname,email,password}){
        try{
              dispach(setLoading(true))
              const data=await Login({fullname,email,password})
              console.log(data);
              dispach(setUser(data.user))
        }
        catch(err){
                      dispach(setError(err.message))
        }
        finally{
                 dispach(setLoading(false))
        }
    }
    return{handleLogin,handleRegister}
}
