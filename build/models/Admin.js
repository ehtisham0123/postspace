"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.SessionModel = exports.Session = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.Session = new mongoose_1.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});
exports.SessionModel = (0, mongoose_1.model)('Session', exports.Session);
const adminSchema = new mongoose_1.Schema({
    adminId: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    privilege: { type: String, default: "admin" },
    deletedAt: { type: Date, default: null },
    refreshToken: {
        type: [exports.Session],
    },
}, { timestamps: true });
adminSchema.pre('save', function save(next) {
    const admin = this;
    try {
        if (!admin.isModified('password')) {
            return next();
        }
        const hash = bcryptjs_1.default.hashSync(admin.password, 10);
        admin.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
});
adminSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
    try {
        const data = this.getUpdate();
        if (data) {
            const password = data.$set.password;
            if (password) {
                this.setOptions({});
                const hash = bcryptjs_1.default.hashSync(password, 10);
                this.setUpdate({ ...data.$set, password: hash });
            }
        }
        next();
    }
    catch (err) {
        return next(err);
    }
});
const comparePassword = async function (candidatePassword, cb) {
    try {
        const isMatch = bcryptjs_1.default.compareSync(candidatePassword, this.password);
        cb(null, isMatch);
    }
    catch (err) {
        cb(err, false);
    }
};
adminSchema.methods.comparePassword = comparePassword;
adminSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
adminSchema.plugin(passportLocalMongoose);
adminSchema.plugin(mongoose_paginate_v2_1.default);
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
