"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetToken = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const resetTokenSchema = new mongoose_1.Schema({
    resetTokenId: { type: String, unique: true, required: true },
    jwt: { type: String, required: true },
    isRevoked: { type: Boolean, default: false },
    type: { type: String, required: true },
    expireAt: { type: Date, expires: 1 * 60 * 60, default: Date.now },
    userId: { type: String, required: true },
}, { timestamps: true });
resetTokenSchema.plugin(mongoose_paginate_v2_1.default);
exports.ResetToken = (0, mongoose_1.model)('ResetToken', resetTokenSchema);
