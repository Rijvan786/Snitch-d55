import {Router} from "express"
import { AuthenticateUser } from "../middlewares/auth.middlewares.js"
import { CartValidation, validateIncrementCartItemQuantity } from "../validator/cart.validator.js"
import { AddTOCartController,
     CreateCartOrderController,
     DecrementCartItemQuantityController,
     DeleteCartController,
     getCartController, 
     IncrementCartItemQuantityController,
     verifyOrderController,

    } from "../controller/cart.controller.js"


const router=Router()

// Add to cart API

router.post("/add/:productId/:variantId",AuthenticateUser,CartValidation,AddTOCartController)

// getCart Data API
router.get("/",AuthenticateUser,getCartController)


//   Increment Cart Quantity and price Api 
router.patch("/quantity/increment/:productId/:variantId",
    AuthenticateUser,validateIncrementCartItemQuantity,IncrementCartItemQuantityController)

//   decrement Cart Quantity and price Api     
router.patch("/quantity/decrement/:productId/:variantId",
    AuthenticateUser,validateIncrementCartItemQuantity,DecrementCartItemQuantityController)

// delete Cart  Data 
router.patch("/Delete/:productId/:variantId",AuthenticateUser,validateIncrementCartItemQuantity,DeleteCartController)


// CreateCart Order 

router.post("/payment/order/create",AuthenticateUser,CreateCartOrderController)

router.post("/payment/verify/create",AuthenticateUser,verifyOrderController)

export default router  

