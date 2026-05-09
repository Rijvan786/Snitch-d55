import {useDispatch} from "react-redux"
import { setError, setLoading } from "../../auth/state/authslice"
import {AddVariants, Createproduct, GetallProduct, GetSellerProduct, ViewDetailProduct } from "../services/product.api"
import { addToCart, Setallproduct, setProducts, SetViewProduct } from "../product.slice"

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

  async function handleGetSellerProduct(){
        try{
        dispatch(setLoading(true))
        const data=await GetSellerProduct()
        dispatch(setProducts(data.products))
    }
    catch(err){
dispatch(setError(err.message))    }
    finally{
        dispatch(setLoading(false))
    }
  }
  async function handleGETallProduct(){
    
    try{
      dispatch(setLoading(true))
      const data=await GetallProduct()
    console.log(data);
    dispatch(Setallproduct(data.products))
    }
    catch(err){
        dispatch(
        setError(err.message,"In handleCreateProduct"))

    }
    finally{
     dispatch(setLoading(false))
    }
  }

  async function handleViewDetailProduct(ProductId) {
     dispatch(setLoading(true))
    const data=await ViewDetailProduct(ProductId)
       
       
      dispatch(addToCart(data.product))

      dispatch(setLoading(false))
      return data
    
  }
 async function handleAddVariant({formData,ProductId}){ 
    console.log(formData);
    console.log(`Data of Handle Add Variant ${formData} & ${ProductId}`);
    
       try{
        dispatch(setLoading(true))

        const data=await AddVariants({formData,ProductId})
        return data.product
       }
       catch(err){
             console.log(err.message);
       }
       finally{
           setLoading(false)
       }
 }
  

  return {handleCreateProduct, 
    handleGetSellerProduct,
    handleGETallProduct,
    handleViewDetailProduct,
    handleAddVariant
    }
}