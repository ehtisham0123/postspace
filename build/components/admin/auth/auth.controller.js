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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.updatePassword = exports.forgotPassword = exports.logout = exports.login = exports.createAdmin = exports.checkSession = void 0;
const log4_1 = require("../../../middleware/log4");
const Authenticate_1 = require("../../utils/Authenticate");
const jwt = __importStar(require("jsonwebtoken"));
const service = __importStar(require("./auth.service"));
const env_1 = require("../../../middleware/env");
const models_1 = require("../../../models");
const Admin_1 = require("../../../models/Admin");
const apiErrorHandler_1 = require("../../utils/apiErrorHandler");
const checkSession = async (req, res, next) => {
    try {
        log4_1.Logger.info(req.user);
        const { userName, privilege } = req.user;
        const data = { userName, privilege };
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
};
exports.checkSession = checkSession;
const createAdmin = async (req, res, next) => {
    try {
        log4_1.Logger.info(req.body);
        const { userName, password } = req.body;
        await service.createAdmin(userName, password);
        res.status(200).json();
    }
    catch (err) {
        next(err);
    }
};
exports.createAdmin = createAdmin;
const login = async (req, res, next) => {
    try {
        log4_1.Logger.info("login");
        const { adminId, userName, privilege, _id } = req.user;
        const token = (0, Authenticate_1.getToken)({ _id: _id, type: privilege });
        const refreshToken = (0, Authenticate_1.getRefreshToken)({ _id: _id, type: privilege });
        // update refresh token in db and refresh token is array in db
        const admin = await models_1.Admin.findById({ _id: _id });
        if (admin) {
            admin.refreshToken.push({ refreshToken });
            await admin.save();
        }
        // set refresh token in cookie and this signed cookie is encrypted
        res.cookie("refreshToken", refreshToken, Authenticate_1.COOKIE_OPTIONS);
        const data = { adminId, userName, privilege, token };
        return res.status(200).send(data);
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        log4_1.Logger.info(req.user);
        const { _id } = req.user;
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies;
        // also get refresh token from cookie signed cookie is encrypted
        req.logOut({ keepSessionInfo: false }, (err) => {
            if (err) {
                throw new apiErrorHandler_1.HttpException(500, "Internal Server Error", 0);
            }
            // remove refresh token from db
            models_1.Admin.findOneAndUpdate({ _id: _id }, { $pull: { refreshToken: { refreshToken: refreshToken } } }, (err, doc) => {
                if (err) {
                    throw new apiErrorHandler_1.HttpException(500, "Internal Server Error", 0);
                }
            });
        });
        res.status(200).json({
            message: "Logout successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
const forgotPassword = async (req, res, next) => {
    try {
        log4_1.Logger.info(req.body);
        const { email } = req.body;
        await service.forgotPassword(email);
        res.status(200).json();
    }
    catch (err) {
        next(err);
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (req, res, next) => {
    try {
        log4_1.Logger.info(req.body);
        const { password, token } = req.body;
        await service.updatePassword(password, token);
        res.status(200).json();
    }
    catch (err) {
        next(err);
    }
};
exports.updatePassword = updatePassword;
// router that will get RefreshTOken from cookie and update the token
const refreshToken = async (req, res, next) => {
    let error, session;
    try {
        session = await models_1.Admin.startSession();
        session.startTransaction();
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies;
        log4_1.Logger.info("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token not found");
        }
        const payload = jwt.verify(refreshToken, env_1.REFRESH_TOKEN_SECRET);
        if (!payload)
            throw new Error("Invalid Token payload");
        const userId = payload?._id;
        // also check if the token is valid or not on Admin table
        const admin = await models_1.Admin.findById({ _id: userId });
        if (!admin)
            throw new Error("Invalid Token admin not found");
        const tokenIndex = admin.refreshToken.findIndex((item) => item.refreshToken === refreshToken);
        if (tokenIndex === -1)
            throw new Error("Invalid Token not found");
        const token = (0, Authenticate_1.getToken)({ _id: userId, type: admin.privilege });
        const newRefreshToken = (0, Authenticate_1.getRefreshToken)({
            _id: userId,
            type: admin.privilege,
        });
        // update the refresh token in the database
        // GET refresh token document id from the admin table
        const refreshTokenId = admin.refreshToken[tokenIndex]._id;
        // update the refresh token in the database
        await Admin_1.SessionModel.findByIdAndUpdate({ _id: refreshTokenId }, { refreshToken: newRefreshToken }, { new: false });
        res.cookie("refreshToken", refreshToken, Authenticate_1.COOKIE_OPTIONS);
        const data = { token };
        await session.commitTransaction();
        return res.status(200).send(data);
    }
    catch (err) {
        if (session)
            await session.abortTransaction();
        next(err);
    }
    finally {
        if (session)
            session.endSession();
    }
};
exports.refreshToken = refreshToken;
