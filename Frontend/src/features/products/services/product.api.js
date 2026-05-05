import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000/api/products",
    withCredentials:true
})


export async function Createproduct(formdata){
    const response=await api.post("/",formdata)

    return response.data
}

export async function GetSellerProduct() {
        
    const response=await api.get("/seller")

    return response.data
    
}