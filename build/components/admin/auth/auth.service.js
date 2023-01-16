"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.createAdmin = void 0;
const Authenticate_1 = require("./../../utils/Authenticate");
const randomstring_1 = __importDefault(require("randomstring"));
const rules_1 = require("../../../constants/rules");
const log4_1 = require("../../../middleware/log4");
const models_1 = require("../../../models");
const apiErrorHandler_1 = require("../../utils/apiErrorHandler");
const japan_1 = require("../../../constants/language/japan");
const errorMessage_1 = require("../../../constants/errorMessage");
const createAdmin = async (userName, password) => {
    let error, session, data;
    try {
        session = await models_1.Admin.startSession();
        session.startTransaction();
        const admin = new models_1.Admin({
            adminId: randomstring_1.default.generate(rules_1.LENGTH_ID),
            userName,
            password,
            privilege: "admin",
        });
        data = await models_1.Admin.findOne({ userName }, null);
        if (data) {
            throw (0, apiErrorHandler_1.dataConflictException)(new Error(errorMessage_1.EMAIL_EXIST));
        }
        await admin.save();
        await Promise.resolve({
            message: "success"
        });
        await session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            await session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve();
    }
};
exports.createAdmin = createAdmin;
const forgotPassword = async (userName) => {
    let error, session;
    try {
        session = await models_1.Admin.startSession();
        session.startTransaction();
        const admin = await models_1.Admin.findOne({ userName }, null, { session });
        if (!admin)
            throw (0, apiErrorHandler_1.dataNotExistException)(new Error(errorMessage_1.EMAIL_NOT_FOUND));
        const { adminId } = admin;
        const jwtoken = (0, Authenticate_1.getToken)({ id: admin._id, type: 'admin' });
        const refreshToken = (0, Authenticate_1.getRefreshToken)({ id: admin._id, type: 'admin' });
        const resetToken = new models_1.ResetToken({
            resetTokenId: randomstring_1.default.generate(rules_1.LENGTH_ID),
            jwt: jwtoken,
            type: rules_1.RESET_TOKEN_TYPES.indexOf(japan_1.RESET_TOKEN_TYPES_RESET_PASSWORD),
        });
        await resetToken.save({ session });
        // sendMessage(RESET_PASSWORD_MESSAGE(email, resetToken.resetTokenId));
        await session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            await session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve();
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (password, token) => {
    let error, session;
    try {
        // session = await ResetToken.startSession();
        // session.startTransaction();
        const resetToken = await models_1.ResetToken.findOne({ resetTokenId: token, isRevoked: false }, null, { session });
        if (!resetToken)
            throw (0, apiErrorHandler_1.dataNotExistException)(new Error(errorMessage_1.INVALID_RESET_TOKEN));
        log4_1.Logger.warn(resetToken);
        if (resetToken.type !== "admin")
            throw (0, apiErrorHandler_1.dataNotExistException)(new Error(errorMessage_1.INVALID_RESET_TOKEN));
        const adminId = "payload";
        const admin = await models_1.Admin.findOneAndUpdate({ adminId }, { $set: { password } }, { session });
        if (!admin)
            throw (0, apiErrorHandler_1.dataNotExistException)(new Error(errorMessage_1.ADMIN_NOT_FOUND));
        await models_1.ResetToken.findOneAndUpdate({ resetTokenId: token }, { $set: { isRevoked: true } }, { session });
        // await session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        // if (session) await session.abortTransaction();
    }
    finally {
        // if (session) session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve();
    }
};
exports.updatePassword = updatePassword;
