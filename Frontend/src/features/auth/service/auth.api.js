import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
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

export async function Login({email,fullname,password}){
    const response =await api.post("/login",{
        email,
        fullname,
        password
    })
    return response.data;
}