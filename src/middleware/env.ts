import dotenv from "dotenv";
import fs from "fs";
import { Logger } from "./log4";
Logger.initialize();

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}

const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === "production";

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const LINE_KID = process.env.LINE_KID;


export { COOKIE_SECRET,REFRESH_TOKEN_SECRET,JWT_SECRET,SEND_GRID_API_KEY,LINE_KID };
