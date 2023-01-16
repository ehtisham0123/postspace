"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINE_KID = exports.SEND_GRID_API_KEY = exports.JWT_SECRET = exports.REFRESH_TOKEN_SECRET = exports.COOKIE_SECRET = exports.IS_PRODUCTION = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const log4_1 = require("./log4");
log4_1.Logger.initialize();
if (fs_1.default.existsSync(".env")) {
    dotenv_1.default.config({ path: ".env" });
}
const ENVIRONMENT = process.env.NODE_ENV;
exports.IS_PRODUCTION = ENVIRONMENT === "production";
const COOKIE_SECRET = process.env.COOKIE_SECRET;
exports.COOKIE_SECRET = COOKIE_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
exports.SEND_GRID_API_KEY = SEND_GRID_API_KEY;
const LINE_KID = process.env.LINE_KID;
exports.LINE_KID = LINE_KID;
