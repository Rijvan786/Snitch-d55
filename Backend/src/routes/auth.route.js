import { Router } from "express";
import { registerValidation } from "../validator/auth.validator.js";
import { RegisterController } from "../controller/auth.controller.js";

const router=Router()

router.post("/register",registerValidation,RegisterController)