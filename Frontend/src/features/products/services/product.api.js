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

export async function GetallProduct(){

    const response=await api.get("/")
       
    return response.data
}

export async function ViewDetailProduct(ProductId) {

    const response=await api.get(`/${ProductId}`)
    return response.data
    
}

export async function ProductEditSeller({ProductId,title,description,priceAmount}){
    
    const response=await api.put( `/Edit-Product/${ProductId} `,{
        title,
        description,
        priceAmount
    })
    return response.data


}
export async function AddVariant({formdata,ProductId}){
    
    const response=await api.post(`/Add-Variant/${ProductId}`,formdata)
    return response.data
}

export async function RelatedVariantData({VariantId}){
    
    const response=await api.get(`/Related-Variant/${VariantId}`)
    return response.data
}

   