import {useDispatch} from "react-redux"
import { setError, setLoading } from "../../auth/state/authslice"
import { AddVariant, Createproduct, GetallProduct, GetSellerProduct, ProductEditSeller, RelatedVariantData, ViewDetailProduct } from "../services/product.api"
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
       
      dispatch(SetViewProduct(data.product))
      dispatch(addToCart(data.product))

      dispatch(setLoading(false))
    
  }

  async function handleEditProduct({ProductId,title,description,priceAmount}) {
    try {
       dispatch(setLoading(true))

      const data=await ProductEditSeller({ProductId,title,description,priceAmount})
      
      return data.product
    } catch (error) {
      
      dispatch(setError(error.message))
    }
    finally{
      dispatch(setLoading(false))
    }
  }

  async function handleAddVariant({ProductId,formdata}) {

    try {
      dispatch(setLoading(true))
      const data=await AddVariant({ProductId,formdata})
      
      return data.product
    } catch (error) {
      
      dispatch(setError(error.message))
    }
    finally{
          dispatch(setLoading(false))
    }
    
  }

  async function handleRelatedVariant({VariantId}) {
         
         const data=await RelatedVariantData({VariantId})
         return data.RelatedVariant
  }

  return {handleCreateProduct, handleGetSellerProduct,handleGETallProduct,handleViewDetailProduct,
    handleEditProduct,handleAddVariant,handleRelatedVariant
  }
}