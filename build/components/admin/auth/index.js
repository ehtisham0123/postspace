"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_validation_1 = require("./auth.validation");
const controller = __importStar(require("./auth.controller"));
const passport = __importStar(require("../../utils/passport"));
const validation_1 = require("../../utils/validation");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Authenticate_1 = require("../../utils/Authenticate");
const accountLimit = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many accounts created from this IP, please try again after an hour",
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.status(200).json("Hello World");
});
// router.get('/session', passport.isAdminAuthenticated, controller.checkSession);
router.post("/register", (0, express_validator_1.checkSchema)(auth_validation_1.REGISTER_ADMIN_SCHEMA), validation_1.checkValidation, controller.createAdmin);
router.put("/login", (0, express_validator_1.checkSchema)(auth_validation_1.LOGIN_SCHEMA), validation_1.checkValidation, passport.adminAuthenticate, controller.login);
// refresh token route
router.post("/refreshToken", controller.refreshToken);
router.put('/logout', Authenticate_1.verifyAdmin, controller.logout);
exports.default = router;
