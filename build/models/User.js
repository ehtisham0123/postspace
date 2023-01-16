"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Admin_1 = require("./Admin");
const userSchema = new mongoose_1.Schema({
    user_id: { type: String, unique: true, required: true, default: (0, uuid_1.v4)() },
    email: { type: String, unique: true, required: true },
    isEmailVerified: { type: Boolean, default: false },
    first_name: { type: String, },
    last_name: { type: String },
    first_name_kena: { type: String, },
    last_name_kena: { type: String, },
    zipcode: { type: String, },
    province: { type: String, },
    city: { type: String, },
    stripeAccountId: { type: String, default: null },
    address: { type: String },
    building_name: { type: String },
    room_number: { type: String },
    usage_status: { type: String, default: 'active' },
    active: { type: Boolean, default: true },
    password: { type: String },
    privilege: { type: String, default: "user" },
    deletedAt: { type: Date, default: null },
    refreshToken: {
        type: [Admin_1.Session],
    },
}, { timestamps: true });
userSchema.pre('save', function save(next) {
    const user = this;
    try {
        if (!user.isModified('password')) {
            return next();
        }
        const hash = bcryptjs_1.default.hashSync(user.password, 10);
        user.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
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
userSchema.methods.comparePassword = comparePassword;
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(mongoosePaginate);
exports.User = (0, mongoose_1.model)('User', userSchema);
