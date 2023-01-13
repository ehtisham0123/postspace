import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../../middleware/log4";
import { unauthorizedException } from "./apiErrorHandler";
import { UserDocument } from "../../@types/models";

import { User } from "../../models";
import {
  ADMIN_APPLYING,
  ADMIN_NOT_FOUND,
  EMAIL_NOT_MATCH,
  PASSWORD_NOT_MATCH,
} from "../../constants/errorMessage";


const LocalStrategy = passportLocal.Strategy;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  // Logger.info('serializeUser' + user);
  done(undefined, { id: user._id, type: user.type });
});

passport.deserializeUser((user: { _id: string; type: string }, done) => {
  console.log("deserializeUser", user);
  if (user.type == "user") {
    User.findById(user._id, (err: any, user: UserDocument) => {
      done(err, user);
    });
  } else {
    done(null, null);
  }
});


passport.use(
  "local-user",
  new LocalStrategy(
    { usernameField: "userName", passwordField: "password" },
    async (userName, password, done) => {
      Logger.info({ message: "passport for user", userName, password });

      User.findOne({ userName }, (err: any, user: UserDocument) => {
        if (err) {
          Logger.info(err);
          return done(err);
        }

        if (!user) {
          Logger.error("user is not defined.");
          return done(undefined, false, {
            message: EMAIL_NOT_MATCH,
          });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            Logger.error(err);
            return done(err);
          }

          if (isMatch) {
            return done(null, user);
          }
          return done(undefined, false, { message: PASSWORD_NOT_MATCH });
        });
      });
    }
  )
);


/**
 * @description authenticate user with email and password
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const userAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-user', async (err, user, info) => {
    try {
      if (err) throw unauthorizedException(err);
      if (!user) throw unauthorizedException(new Error(info.message));

      const admin = await User.findOne({ userId: user.userId }, { password: 0 });
      if (!admin) throw unauthorizedException(new Error(ADMIN_NOT_FOUND));

      if (user) {
        console.log("user", user);
        if (admin.privilege == "user") {
          req.login(user, (err) => {
            if (err) throw unauthorizedException(err);

            
            req.user = admin;
            next();
          });
        } else {
          throw unauthorizedException(new Error(ADMIN_APPLYING));
        }
      } else {
        throw unauthorizedException(info);
      }
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};

