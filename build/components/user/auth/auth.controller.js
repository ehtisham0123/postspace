"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// import * as service from "./auth.service";
const login = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Hello World" });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
