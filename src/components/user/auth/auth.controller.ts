import { Request, Response, NextFunction } from "express";
import { UserDocument } from "../../../@types/models";
import { Logger } from "../../../middleware/log4";
import {
  COOKIE_OPTIONS,
  getRefreshToken,
  getToken,
} from "../../utils/Authenticate";

import * as jwt from "jsonwebtoken";

import * as service from "./auth.service";
import { REFRESH_TOKEN_SECRET } from "../../../middleware/env";
import { User } from "../../../models";
import { Session, SessionModel } from "../../../models/User";
import { HttpException } from "../../utils/apiErrorHandler";

export const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info(req.user);
    const { userName, privilege } = <UserDocument>req.user;
    const data = { userName, privilege };

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info(req.body);

    const { userName, password } = req.body;

    await service.createUser(userName, password);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info("login");
    const { userId, userName, privilege, _id } = <UserDocument>req.user;

    const token = getToken({ _id: _id, type: privilege });
    const refreshToken = getRefreshToken({ _id: _id, type: privilege });

    // update refresh token in db and refresh token is array in db

    const user = await User.findById({ _id: _id });

    if (user) {
      user.refreshToken.push({ refreshToken });
      await user.save();
    }
    // set refresh token in cookie and this signed cookie is encrypted
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    const data = { userId, userName, privilege, token };
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info(req.user);
    const { _id } = <UserDocument>req.user;
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    // also get refresh token from cookie signed cookie is encrypted

    req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) {
        throw new HttpException(500, "Internal Server Error", 0);
      }

      // remove refresh token from db
      User.findOneAndUpdate(
        { _id: _id },
        { $pull: { refreshToken: { refreshToken: refreshToken } } },
        (err: any, doc: any) => {
          if (err) {
            throw new HttpException(500, "Internal Server Error", 0);
          }
        }
      );
    });

    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info(req.body);

    const { email } = req.body;

    await service.forgotPassword(email);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Logger.info(req.body);

    const { password, token } = req.body;

    await service.updatePassword(password, token);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

// router that will get RefreshTOken from cookie and update the token

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: Error | HttpException | undefined, session;
  try {
    session = await User.startSession();
    session.startTransaction();

    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    Logger.info("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const payload: any = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string
    );
    if (!payload) throw new Error("Invalid Token payload");
    const userId = payload?._id;
    // also check if the token is valid or not on User table
    const user = await User.findById({ _id: userId });
    if (!user) throw new Error("Invalid Token user not found");

    const tokenIndex = user.refreshToken.findIndex(
      (item: any) => item.refreshToken === refreshToken
    );

    if (tokenIndex === -1) throw new Error("Invalid Token not found");

    const token = getToken({ _id: userId, type: user.privilege });

    const newRefreshToken = getRefreshToken({
      _id: userId,
      type: user.privilege,
    });

    // update the refresh token in the database
    // GET refresh token document id from the user table
    const refreshTokenId = user.refreshToken[tokenIndex]._id;

    // update the refresh token in the database
    await SessionModel.findByIdAndUpdate(
      { _id: refreshTokenId },
      { refreshToken: newRefreshToken },
      { new: false }
    );

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

    const data = { token };

    await session.commitTransaction();
    return res.status(200).send(data);
  } catch (err) {
    if (session) await session.abortTransaction();
    next(err);
  } finally {
    if (session) session.endSession();
  }
};
