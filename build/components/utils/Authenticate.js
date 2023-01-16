"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.verifyAdmin = exports.getRefreshToken = exports.getToken = exports.COOKIE_OPTIONS_PARENT = exports.COOKIE_OPTIONS = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: 60 * 60 * 24 * 30 * 1000,
};
exports.COOKIE_OPTIONS_PARENT = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: 60 * 60 * 24 * 365 * 1000,
};
const getToken = (user) => {
    return jwt.sign({ ...user, tokenType: "accessToken" }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
exports.getToken = getToken;
const getRefreshToken = (user) => {
    const refreshToken = jwt.sign({ ...user, tokenType: "refresh" }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d" // 30 days,
    });
    return refreshToken;
};
exports.getRefreshToken = getRefreshToken;
exports.verifyAdmin = passport_1.default.authenticate("jwt-admin", { session: false });
exports.verifyUser = passport_1.default.authenticate("jwt-user", { session: false });
