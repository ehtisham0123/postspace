import { Request, Response, NextFunction } from "express";
// import * as service from "./auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({Message : "Hello World"})
  } catch (err) {
    next(err);
  }
};

