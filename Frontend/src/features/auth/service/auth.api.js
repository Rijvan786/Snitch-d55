import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function Register({email,fullname,password,contact,isSeller}){
         const response=await api.post("/api/auth/register",{
            email,
            fullname,
            password,
            contact,
            isSeller 
         })
         return response.data;
}

export async function Login({fullname,email,password}){
    const response =await api.post("/api/auth/login",{
        fullname,
        email,
        password
    })
    return response.data;
}
export  async function getMe(){
    const response=await api.get("/api/auth/getme")
    console.log(response);
    return response.data
}

