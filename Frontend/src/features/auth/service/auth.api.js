import axios from "axios";
const api=axios.create({
    baseURL:"https://snitch-d55.onrender.com/api/auth",
    withCredentials:true
})

export async function Register({email,fullname,password,contact,isSeller}){
         const response=await api.post("/register",{
            email,
            fullname,
            password,
            contact,
            isSeller 
         })
         return response.data;
}

export async function Login({fullname,email,password}){
    const response =await api.post("/login",{
        fullname,
        email,
        password
    })
    return response.data;
}

export async function ResendMail({email}){
    
    const response=await api.post("/resendMail",{email})

    return response.data
}

export async function ForgetPasswordMail({email}){
    console.log(email)
    const response=await api.post("/ForgetMail",{email})
    return response.data
}
 
export async function ForgetPassword({NewPassword}){
      
          const response=await api.patch("/ForgetPassword",{NewPassword})
          return response.data 
}

export  async function getMe(){
    const response=await api.get("/getme")
    console.log(response);
    return response.data
}

export async function Logout(){
    const response = await api.get("/logout")
    return response.data
}



