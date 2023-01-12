import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
var logger = require("morgan");
import { COOKIE_SECRET } from "./env";

export const config = async (app: express.Application) => {
  //   app.use(Logger.access());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(COOKIE_SECRET));
  //   app.use(express.static(path.join(__dirname, '../../public')));

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

};
