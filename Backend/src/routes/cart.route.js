import {Router} from "express"
import { AuthenticateUser } from "../middlewares/auth.middlewares.js"
import { CartValidation, validateIncrementCartItemQuantity } from "../validator/cart.validator.js"
import { AddTOCartController,
     DecrementCartItemQuantityController,
     DeleteCartController,
     getCartController, 
     IncrementCartItemQuantityController,
    createOrderController,
    verifyOrderController
    } from "../controller/cart.controller.js"


const router=Router()

router.post("/add/:productId/:variantId",AuthenticateUser,CartValidation,AddTOCartController)

router.get("/",AuthenticateUser,getCartController)

router.patch("/quantity/increment/:productId/:variantId",
    AuthenticateUser,validateIncrementCartItemQuantity,IncrementCartItemQuantityController)

    
router.patch("/quantity/decrement/:productId/:variantId",
    AuthenticateUser,validateIncrementCartItemQuantity,DecrementCartItemQuantityController)

router.patch("/Delete/:productId/:variantId",AuthenticateUser,validateIncrementCartItemQuantity,DeleteCartController)

router.post("/payment/create/order",AuthenticateUser,createOrderController )

router.post("/payment/verify/order",AuthenticateUser,verifyOrderController)
export default router   