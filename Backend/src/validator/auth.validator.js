import {body,validationResult} from "express-validator"


function validation(req,res,next){

    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }

}

export const registerValidation=[
    body("email").isEmail().withMessage("Please enter a valid email address"),
body("password").matches(/^(?=.*[!@#$%^&*])(?=.{8,})/).withMessage("Password must be at least 8 characters long and contain at least one special character"),
body("contact").isMobilePhone().withMessage("Please enter a valid contact number"),
body("fullname").isLength({min:8}).withMessage("Full name is required"),
body("isSeller").isBoolean().withMessage("isSeller must be a boolean value  "),
validation
] 
