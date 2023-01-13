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

export { COOKIE_SECRET,REFRESH_TOKEN_SECRET };
