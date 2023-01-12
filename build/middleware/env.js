"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_SECRET = exports.IS_PRODUCTION = void 0;
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
