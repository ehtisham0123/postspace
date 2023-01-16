import express from "express";
import { checkSchema } from "express-validator";

import {
  FORGOT_PASSWORD_SCHEMA,
  LOGIN_SCHEMA,
  REGISTER_ADMIN_SCHEMA,
  UPDATE_PASSWORD_SCHEMA,
} from "./auth.validation";

import * as controller from "./auth.controller";
import * as passport from "../../utils/passport";
import { checkValidation } from "../../utils/validation";
import rateLimit from "express-rate-limit";
import { verifyAdmin } from "../../utils/Authenticate";

const accountLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
    "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();



router.get("/", (req,res)=>{
  return res.status(200).json("Hello World")
})





// router.get('/session', passport.isAdminAuthenticated, controller.checkSession);
router.post(
  "/register",
  checkSchema(REGISTER_ADMIN_SCHEMA),
  checkValidation,
  controller.createAdmin
);
router.put("/login", 
checkSchema(LOGIN_SCHEMA),
checkValidation,
passport.adminAuthenticate, 
controller.login);

// refresh token route

router.post(
  "/refreshToken",
  controller.refreshToken
);


router.put('/logout',verifyAdmin, controller.logout);

export default router;
