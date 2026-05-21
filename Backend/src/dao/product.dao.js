import ProductModel from "../models/product.model.js";

export async function   stockOfVariant (productId,variantId){

    const product=await ProductModel.findOne({
        _id:productId,
        "variants._id":variantId
    })

    const stock=product.variants.find(variant=>variant._id.toString()===variantId).stock
    return stock
}