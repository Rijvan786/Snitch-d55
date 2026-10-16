import { Router } from "express";
import { registerValidation } from "../validator/auth.validator.js";
import { Email_Verification,
   ForgetMailController,
   ForgetPasswordController,
   GetmeController, 
   GoogleCallback, 
   LoginController, 
   LogoutController, 
   RegisterController, 
   ResendMailController} from "../controller/auth.controller.js";
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

/** Verify_Email
 * /api/auth/verify_email
 */

router.get("/verify-email",Email_Verification)
/** 
 * 
 * /api/auth/resendMail
 */

router.post("/resendMail",ResendMailController)

/** /api/auth/ForgetMail */

router.post("/ForgetMail",ForgetMailController)

/** /api/auth/forgetPassword */
router.patch("/forgetPassword",AuthenticateUser,ForgetPasswordController)

/** /api/auth/getme */
router.get("/getme",AuthenticateUser,GetmeController)

/**
 * /api/auth/logout
 */
router.get("/logout",AuthenticateUser,LogoutController)


export default router