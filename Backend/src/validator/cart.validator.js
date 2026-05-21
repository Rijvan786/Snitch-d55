import {body,param,validationResult} from "express-validator"


const validation=(req,res,next)=>{
    
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            message:"Validation Result",
            error:error.array()
        })
    }
    next()
}

export const CartValidation=[
    param("productId").isMongoId().withMessage("InvalidProductId"),
    param("variantId").optional().isMongoId().withMessage("Invalid VariantId"),
    body("quantity").optional().isInt({min:1}).withMessage("Quantity must be at least 1"),
    validation  
]

export const validateIncrementCartItemQuantity=[    
   param("productId").isMongoId().withMessage("InvalidProductId"),
    param("variantId").optional().isMongoId().withMessage("Invalid VariantId"),
validation
]