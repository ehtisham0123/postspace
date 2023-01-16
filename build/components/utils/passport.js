"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthenticate = exports.userAuthenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const log4_1 = require("../../middleware/log4");
const apiErrorHandler_1 = require("./apiErrorHandler");
const models_1 = require("../../models");
const errorMessage_1 = require("../../constants/errorMessage");
const LocalStrategy = passport_local_1.default.Strategy;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport_1.default.serializeUser((user, done) => {
    // Logger.info('serializeUser' + user);
    done(undefined, { id: user._id, type: user.type });
});
passport_1.default.deserializeUser((user, done) => {
    console.log("deserializeUser", user);
    if (user.type == "admin") {
        models_1.Admin.findById(user._id, (err, admin) => {
            done(err, admin);
        });
    }
    else if (user.type == "user") {
        models_1.User.findById(user._id, (err, user) => {
            done(err, user);
        });
    }
    else {
        done(null, null);
    }
});
passport_1.default.use("local-user", new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    log4_1.Logger.info({ message: "passport for user", email, password });
    models_1.User.findOne({ email }, (err, user) => {
        if (err) {
            log4_1.Logger.info(err);
            return done(err);
        }
        if (!user) {
            log4_1.Logger.error("user is not defined.");
            return done(undefined, false, {
                message: errorMessage_1.EMAIL_NOT_MATCH,
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                log4_1.Logger.error(err);
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(undefined, false, { message: errorMessage_1.PASSWORD_NOT_MATCH });
        });
    });
}));
passport_1.default.use("local-admin", new LocalStrategy({ usernameField: "userName", passwordField: "password" }, async (userName, password, done) => {
    log4_1.Logger.info({ message: "passport for admin", userName, password });
    models_1.Admin.findOne({ userName }, (err, admin) => {
        if (err) {
            log4_1.Logger.info(err);
            return done(err);
        }
        if (!admin) {
            log4_1.Logger.error("admin is not defined.");
            return done(undefined, false, {
                message: errorMessage_1.EMAIL_NOT_MATCH,
            });
        }
        admin.comparePassword(password, (err, isMatch) => {
            if (err) {
                log4_1.Logger.error(err);
                return done(err);
            }
            if (isMatch) {
                return done(null, admin);
            }
            return done(undefined, false, { message: errorMessage_1.PASSWORD_NOT_MATCH });
        });
    });
}));
/**
 * @description authenticate user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const userAuthenticate = (req, res, next) => {
    passport_1.default.authenticate("local-user", async (err, user, info) => {
        try {
            if (err)
                throw (0, apiErrorHandler_1.unauthorizedException)(err);
            if (!user)
                throw (0, apiErrorHandler_1.unauthorizedException)(new Error(info.message));
            const u = await models_1.User.findOne({ parent_id: user.parent_id }, { password: 0 });
            if (!u)
                throw (0, apiErrorHandler_1.unauthorizedException)(new Error(errorMessage_1.USER_NOT_EXIST));
            if (u) {
                req.login(u, (err) => {
                    if (err)
                        throw (0, apiErrorHandler_1.unauthorizedException)(err);
                    req.user = u;
                    next();
                });
            }
            else {
                throw (0, apiErrorHandler_1.unauthorizedException)(info);
            }
        }
        catch (err) {
            next(err);
        }
    })(req, res, next);
};
exports.userAuthenticate = userAuthenticate;
/**
 * @description authenticate admin with email and password
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const adminAuthenticate = (req, res, next) => {
    passport_1.default.authenticate("local-admin", async (err, user, info) => {
        try {
            if (err)
                throw (0, apiErrorHandler_1.unauthorizedException)(err);
            if (!user)
                throw (0, apiErrorHandler_1.unauthorizedException)(new Error(info.message));
            const admin = await models_1.Admin.findOne({ adminId: user.adminId }, { password: 0 });
            if (!admin)
                throw (0, apiErrorHandler_1.unauthorizedException)(new Error(errorMessage_1.ADMIN_NOT_FOUND));
            if (user) {
                console.log("user", user);
                if (admin.privilege == "admin") {
                    req.login(user, (err) => {
                        if (err)
                            throw (0, apiErrorHandler_1.unauthorizedException)(err);
                        req.user = admin;
                        next();
                    });
                }
                else {
                    throw (0, apiErrorHandler_1.unauthorizedException)(new Error(errorMessage_1.ADMIN_APPLYING));
                }
            }
            else {
                throw (0, apiErrorHandler_1.unauthorizedException)(info);
            }
        }
        catch (err) {
            next(err);
        }
    })(req, res, next);
};
exports.adminAuthenticate = adminAuthenticate;
