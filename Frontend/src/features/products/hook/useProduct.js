import {useDispatch} from "react-redux"
import { setError, setLoading } from "../../auth/state/authslice"
import { Createproduct, GetSellerProduct } from "../services/product.api"
import { setProducts } from "../product.slice"

export  function useProduct(){

    const dispatch=useDispatch()

  async function handleCreateProduct(formData){

    try{
        dispatch(setLoading(true))
       
        const data=await Createproduct(formData)
        return data.products
    }
    catch(err){
        setError(err.message,"In handleCreateProduct")
    }
    finally{
        dispatch(setLoading(false))
    }
  }

  async function handleGetSellerProuduct(){
        try{
        dispatch(setLoading(true))
        const data=await GetSellerProduct()
        dispatch(setProducts(data.products))
    }
    catch(err){
        setError(err.message,"In handleCreateProduct")
    }
    finally{
        dispatch(setLoading(false))
    }
  }

  return {handleCreateProduct, handleGetSellerProuduct}
}