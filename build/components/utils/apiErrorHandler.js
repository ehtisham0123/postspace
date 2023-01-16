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
exports.badImplementationException = exports.pageNoFoundException = exports.emailConflictException = exports.dataConflictException = exports.unauthorizedException = exports.payjpInvalidCardException = exports.dataExceedException = exports.userNotActivateException = exports.dataNotExistException = exports.validationException = exports.HttpException = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const log4_1 = require("../../middleware/log4");
const ERROR = __importStar(require("../../constants/errorMessage"));
class HttpException extends Error {
    constructor(statusCode, message, subStatusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message;
        this.errorMessage = message;
        this.subStatusCode = subStatusCode;
    }
}
exports.HttpException = HttpException;
const validationException = (errors) => {
    errors ? log4_1.Logger.error(errors.errors[0].msg) : log4_1.Logger.error(ERROR.VALIDATION);
    let errorMessagesArray = [];
    // only push even index
    errors.errors.forEach((error, index) => {
        if (index % 2 === 0) {
            errorMessagesArray.push(error.msg);
        }
    });
    return new HttpException(400, errorMessagesArray || ERROR.VALIDATION, 1001);
};
exports.validationException = validationException;
const dataNotExistException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.DATANOTFOUND);
    return new HttpException(400, error.message || ERROR.DATANOTFOUND, 1002);
};
exports.dataNotExistException = dataNotExistException;
const userNotActivateException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.USERNOTACTIVATE);
    return new HttpException(400, error.message || ERROR.USERNOTACTIVATE, 1003);
};
exports.userNotActivateException = userNotActivateException;
const dataExceedException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.DATAEXCEED);
    return new HttpException(400, error.message || ERROR.DATAEXCEED, 1004);
};
exports.dataExceedException = dataExceedException;
const payjpInvalidCardException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.PAYJP_INVALID_CARD);
    return new HttpException(400, ERROR.PAYJP_INVALID_CARD, 1005);
};
exports.payjpInvalidCardException = payjpInvalidCardException;
const unauthorizedException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.UNAUTH);
    return new HttpException(401, error.message || ERROR.UNAUTH, 2001);
};
exports.unauthorizedException = unauthorizedException;
const dataConflictException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.CONFLICT);
    return new HttpException(409, error || error.message || ERROR.CONFLICT, 3001);
};
exports.dataConflictException = dataConflictException;
const emailConflictException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.CONFLICT);
    return new HttpException(409, error.message || ERROR.CONFLICT, 2002);
};
exports.emailConflictException = emailConflictException;
const pageNoFoundException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.PAGENOTFOUND);
    return new HttpException(404, error.message || ERROR.PAGENOTFOUND, 4000);
};
exports.pageNoFoundException = pageNoFoundException;
const badImplementationException = (error) => {
    error ? log4_1.Logger.error(error) : log4_1.Logger.error(ERROR.BADIMPLEMENTATION);
    return new HttpException(500, error.message || ERROR.BADIMPLEMENTATION, 5000);
};
exports.badImplementationException = badImplementationException;
