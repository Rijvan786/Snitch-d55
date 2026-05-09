import { Router } from "express";
import { AuthenticateSeller } from "../middlewares/auth.middlewares.js";
import multer from "multer"
import {  AddProductVariantController, CreateProductController,
    
     GetallProductController, GetSellerProductController,
      ViewProductDetailController, 
    } from "../controller/product.controller.js";
import { CreateProductValidation } from "../validator/product.validator.js";
const upload  = multer({storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024
    }
})
const router=Router()

router.post("/",AuthenticateSeller,CreateProductValidation, upload.array("images",7),CreateProductController)

router.get("/seller",AuthenticateSeller,GetSellerProductController)

router.get("/",GetallProductController)

router.get("/:ProductId",ViewProductDetailController)

router.post("/:ProductId/variants",AuthenticateSeller,upload.array("images",7),CreateProductValidation,AddProductVariantController)

export default router