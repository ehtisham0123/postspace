"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTER_ADMIN_SCHEMA = exports.UPDATE_PASSWORD_SCHEMA = exports.FORGOT_PASSWORD_SCHEMA = exports.LOGIN_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.LOGIN_SCHEMA = {
    userName: (0, validation_1.VALIDATION_USER_NAME)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
};
exports.FORGOT_PASSWORD_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
};
exports.UPDATE_PASSWORD_SCHEMA = {
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
    token: (0, validation_1.VALIDATION_ID)('body'),
};
exports.REGISTER_ADMIN_SCHEMA = {
    userName: (0, validation_1.VALIDATION_USER_NAME)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
};
