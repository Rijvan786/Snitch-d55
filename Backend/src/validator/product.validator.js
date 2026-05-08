import { body,validationResult } from "express-validator";

function validation(req,res,next){

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    next()

}

export const CreateProductValidation=[
    body("title").isEmpty().withMessage("Title is required"),
    body("description").isEmpty().withMessage("Description is required"),
    body("priceAmount").isEmpty().withMessage("not a string only number"),
    body("priceCurrency").isEmpty().withMessage("Currency must be one of USD, EUR, GBP, JPY, CNY,INR"),
    validation  
]