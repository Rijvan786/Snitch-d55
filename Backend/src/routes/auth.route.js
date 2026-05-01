import { Router } from "express";
import { registerValidation } from "../validator/auth.validator.js";
import { LoginController, RegisterController } from "../controller/auth.controller.js";

const router=Router()

router.post("/register",registerValidation,RegisterController)

router.post("/login",LoginController)

export default router