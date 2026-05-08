import { Router } from "express";
import { AuthenticateSeller } from "../middlewares/auth.middlewares.js";
import multer from "multer"
import { AddVariantController, CreateProductController,
     EditProductController, 
     GetallProductController, GetSellerProductController,
      ViewProductDetailController, 
      ViewRelatedVariantController} from "../controller/product.controller.js";
import { CreateProductValidation } from "../validator/product.validator.js";
const upload  = multer({storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024
    }
})
const router=Router()

router.post("/",AuthenticateSeller,CreateProductValidation, upload.array("images",7),CreateProductController)

router.put("/Edit-Product/:ProductId",AuthenticateSeller,EditProductController)

router.post("/Add-Variant/:ProductId",AuthenticateSeller,CreateProductValidation,upload.array("images",7),AddVariantController)

router.get("/Related-Variant/:VariantId",AuthenticateSeller,ViewRelatedVariantController)

router.get("/seller",AuthenticateSeller,GetSellerProductController)

router.get("/",GetallProductController)

router.get("/:ProductId",ViewProductDetailController)
export default router