import { Router } from "express";
import { registerValidation } from "../validator/auth.validator.js";
import { GetmeController, GoogleCallback, LoginController, LogoutController, RegisterController } from "../controller/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { AuthenticateUser } from "../middlewares/auth.middlewares.js";

const router=Router()

/*** Register Api  */
router.post("/register",registerValidation,RegisterController)

/*** Login Api */
router.post("/login",LoginController)

/** google redirect url for permission */
router.get("/google",
    passport.authenticate('google',{scope:['profile','email']}))

/** Authenticate by Google Oauth */

router.get("/google/callback",passport.authenticate('google',{session:false,failureRedirect:config.NODE_ENV=="development" ? " http://localhost:5173/login":"/login"}),
  GoogleCallback
)

router.get("/getme",AuthenticateUser,GetmeController)

router.get("/logout",AuthenticateUser,LogoutController)


export default router